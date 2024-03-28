import { MethodStubBuilder } from './methodStubs/MethodStubBuilder'
import { isObject } from './lib/isObject'
import { ObjectInspector } from './lib/ObjectInspector'
import { MethodStub } from './methodStubs/MethodStub'
import { Matcher } from './matchers/Matcher'
import { eq } from './matchers/EqualsMatcher'
import { NullMethodStub } from './methodStubs/NullMethodStub'

export class Mocker {
    private internalMock: any = {}
    readonly mock: any
    readonly instance: any = {}
    private objectInspector = new ObjectInspector()
    private methodStubs: Record<string, MethodStub<any>[]> = {}

    constructor(private clazz?: any) {
        this.mock = this.createMock()
        this.addMockClassStubs()
        this.instance = this.createInstance()
    }

    private createInstance(): any {
        const instance = new Proxy(this.instance, {
            get: (target: any, name: PropertyKey) => {
                if (!(name in target)) {
                    if (this.clazz) {
                        // catch properties without getter
                        this.defineMockPropertyStub(name.toString())
                    } else { // Interface methods
                        this.defineMockMethodStub(name.toString())
                    }
                }
                return target[name]
            },
        })
        instance.__mocktMocker = this
        return instance
    }

    private createMock(): any {
        const mock: any = new Proxy(this.internalMock, {
            get: (target: any, name: PropertyKey) => {
                const hasMethodStub = name in target
                if (!hasMethodStub) {
                    if (this.clazz) {
                        // catch properties without getter
                        this.defineMockPropertyStub(name.toString())
                    } else { // Interface methods
                        this.defineMockMethodStub(name.toString())
                    }
                }

                return target[name]
            },
        })
        mock.__mocktMocker = this
        return mock
    }

    private addMockClassStubs() {
        if (!isObject(this.clazz)) return
        this.addMockMembersStubs(this.clazz.prototype)
    }

    private addMockMembersStubs(clazzPrototype: any) {
        this.objectInspector.getAllPropertyNames(clazzPrototype).forEach(({ obj, propertyName }) => {
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
        if (Object.hasOwn(this.internalMock, propertyName)) return

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
            const matchers: Matcher[] = args.map(it => it instanceof Matcher ? it : eq(it))
            return new MethodStubBuilder(
                this.internalMock,
                name,
                matchers,
                this.addMethodStub.bind(this),
                this.defineMockMethodStub.bind(this),
            )
        }
    }

    private addMethodStub<R>(stub: MethodStub<R>) {
        if (!this.methodStubs[stub.name]) {
            this.methodStubs[stub.name] = []
        }
        this.methodStubs[stub.name].push(stub)
    }

    private defineInstancePropertyExecutor(propertyName: string, force: boolean = false) {
        if (force) delete this.instance[propertyName]
        if (Object.hasOwn(this.instance, propertyName)) return

        Object.defineProperty(this.instance, propertyName, {
            get: this.createExecutor(propertyName),
            configurable: true,
        })
    }

    private defineInstanceMethodExecutor(methodName: string, force: boolean = false): void {
        if (force) delete this.instance[methodName]
        if (Object.hasOwn(this.instance, methodName)) return

        this.instance[methodName] = this.createExecutor(methodName)
    }

    private createExecutor(propertyName: string): (...args: any[]) => any {
        return (...args: any[]) => {
            // const action: MethodAction = new MethodAction(key, args)
            // this.methodActions.push(action);
            const methodStub = this.findMethodStub(propertyName, args)
            return methodStub.execute(args)
        }
    }

    private findMethodStub(name: string, args: any[]): MethodStub<any> {
        if (this.methodStubs[name]) {
            // this.defineMockMethodStub(name)
            const stub = this.methodStubs[name].find(stub => stub.matches(args))
            if (stub) return stub
        }

        return new NullMethodStub(name)
    }
}
