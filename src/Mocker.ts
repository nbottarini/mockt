import { MethodStubBuilder } from '@/methodStubs/MethodStubBuilder'
import { isObject } from '@/lib/isObject'
import { ObjectInspector } from '@/lib/ObjectInspector'
import { MethodStub } from '@/methodStubs/MethodStub'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { NullMethodStub } from '@/methodStubs/NullMethodStub'
import { InvocationTracker } from '@/lib/InvocationTracker'
import { UnknownResponse } from '@/UnknownResponse'
import { MultiAnswerMethodStub } from '@/methodStubs/MultiAnswerMethodStub'

export class Mocker {
    private internalMock: any = {}
    readonly mock: any
    readonly instance: any = {}
    private objectInspector = new ObjectInspector()
    private methodStubs: Record<string, MultiAnswerMethodStub<any>[]> = {}
    readonly invocationTracker = new InvocationTracker()
    private mocktProperty = '__mocktMocker'

    constructor(private clazz?: any) {
        this.mock = this.createMock()
        this.addMockClassStubs()
        this.instance = this.createInstance()
    }

    private createInstance(): any {
        const instance = new Proxy(this.instance, {
            get: (target: any, name: PropertyKey) => {
                if (name in target) return target[name]
                let propertyName = name.toString()
                this.invocationTracker.add('getProperty', [propertyName])
                return new UnknownResponse(propertyName, this.invocationTracker)
            },
            set: (target: any, name: PropertyKey, newValue: any) => {
                if (name !== this.mocktProperty) this.invocationTracker.add('setProperty', [name, newValue])
                target[name] = newValue
                return true
            }
        })
        instance[this.mocktProperty] = this
        return instance
    }

    private createMock(): any {
        const mock = new Proxy(this.internalMock, {
            get: (target: any, name: PropertyKey) => {
                const hasMethodStub = name in target
                if (!hasMethodStub) {
                    this.defineMockPropertyStub(name.toString())
                }
                return target[name]
            }
        })
        mock[this.mocktProperty] = this
        return mock
    }
    private addMockClassStubs() {
        if (!isObject(this.clazz)) return
        this.objectInspector.getAllPropertyNames(this.clazz.prototype).forEach(({ obj, propertyName }) => {
            const descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)
            if (descriptor.get) {
                this.defineMockPropertyStub(propertyName)
            } else if (typeof descriptor.value === 'function') {
                this.defineMockMethodStub(propertyName)
            }
        })
    }

    private defineMockPropertyStub(propertyName: string, force: boolean = false): void {
        if (force) delete this.internalMock[propertyName]
        if (Object.hasOwn(this.internalMock, propertyName) || propertyName === this.mocktProperty) return

        Object.defineProperty(this.internalMock, propertyName, {
            get: this.createMethodStub(propertyName),
            configurable: true,
        })
        this.defineInstancePropertyExecutor(propertyName, force)
    }

    private defineMockMethodStub(methodName: string, force: boolean = false): void {
        if (force) delete this.internalMock[methodName]
        if (Object.hasOwn(this.internalMock, methodName)) return

        this.internalMock[methodName] = this.createMethodStub(methodName)
        this.defineInstanceMethodExecutor(methodName, force)
    }

    private createMethodStub(name: string): (...args: any[]) => any {
        return (...args: any[]) => {
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            return new MethodStubBuilder(
                this.internalMock,
                name,
                matchers,
                this.addMethodStub.bind(this),
                this.defineMockMethodStub.bind(this),
            )
        }
    }

    private addMethodStub<R>(stub: MethodStub<R>, appendAnswer: boolean = false) {
        if (!this.methodStubs[stub.name]) this.methodStubs[stub.name] = []

        if (appendAnswer) {
            const existingStub = this.methodStubs[stub.name].findLast(it => it.hasSameMatchers(stub))
            if (existingStub) {
                existingStub.append(stub)
                return
            }
        }
        this.methodStubs[stub.name].push(MultiAnswerMethodStub.from(stub))
    }

    private defineInstancePropertyExecutor(propertyName: string, force: boolean = false) {
        if (force) delete this.instance[propertyName]
        if (Object.hasOwn(this.instance, propertyName) || propertyName === this.mocktProperty) return

        Object.defineProperty(this.instance, propertyName, {
            get: () => {
                this.invocationTracker.add('getProperty', [propertyName])
                const methodStub = this.findMethodStub(propertyName, [])
                return methodStub.execute([])
            },
            set: (value: any) => {
                this.invocationTracker.add('setProperty', [propertyName, value])
            },
            configurable: true,
        })
    }

    private defineInstanceMethodExecutor(methodName: string, force: boolean = false): void {
        if (force) delete this.instance[methodName]
        if (Object.hasOwn(this.instance, methodName)) return

        this.instance[methodName] = (...args: any[]) => {
            this.invocationTracker.add(methodName, args)
            const methodStub = this.findMethodStub(methodName, args)
            return methodStub.execute(args)
        }
    }
    
    private findMethodStub(name: string, args: any[]): MethodStub<any> {
        if (this.methodStubs[name]) {
            const stub = this.methodStubs[name].findLast(stub => stub.matches(args))
            if (stub) return stub
        }

        return new NullMethodStub(name)
    }

    resetCalls() {
        for (let methodName of Object.keys(this.methodStubs)) {
            this.methodStubs[methodName].forEach(stub => stub.reset())
        }
        this.invocationTracker.reset()
    }

    reset() {
        this.methodStubs = {}
        this.invocationTracker.reset()
    }
}
