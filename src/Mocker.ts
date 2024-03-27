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
    private excludedPropertyNames = ['hasOwnProperty']
    // private mockableFunctionsFinder = new MockableFunctionsFinder()
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
                    // this.defineMockPropertyStub(name.toString())
                    // this.defineInstancePropertyExecutor(name.toString())
                    this.defineInstanceMethodExecutor(name.toString())
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
                    // this.defineMockPropertyStub(name.toString())
                    this.defineMockMethodStub(name.toString())
                    this.defineInstanceMethodExecutor(name.toString())
                }

                return target[name]
            },
        })
        mock.__mocktMocker = this
        return mock
    }

    private addMockClassStubs() {
        if (!isObject(this.clazz)) return
        this.addMockPropertiesStubs(this.clazz.prototype)
        // this.addMockClassCodeStubs(this.clazz)
    }

    private addMockPropertiesStubs(clazzPrototype: any) {
        this.objectInspector.getPrototypes(clazzPrototype).forEach((obj) => {
            this.objectInspector.getOwnPropertyNames(obj).forEach((propertyName: string) => {
                if (this.propertyIsExcluded(propertyName)) return

                const descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)
                if (descriptor.get) {
                    this.defineMockPropertyStub(propertyName)
                    this.defineInstancePropertyExecutor(propertyName)
                    // this.createInstanceActionListener(propertyName, obj)
                } else if (typeof descriptor.value === 'function') {
                    this.defineMockMethodStub(propertyName)
                    this.defineInstanceMethodExecutor(propertyName)
                } else {
                    // no need to reassign properties
                }
            })
        })
    }

    // private addMockClassCodeStubs(clazz: any) {
    //     const classCode = typeof clazz.toString !== 'undefined' ? clazz.toString() : ''
    //     const functionNames = this.mockableFunctionsFinder.find(classCode)
    //     functionNames.forEach((functionName: string) => {
    //         this.createMethodStub(functionName)
    //         this.defineInstancePropertyExecutor(functionName)
    //     })
    // }

    private defineMockPropertyStub(propertyName: string): void {
        if (Object.hasOwn(this.internalMock, propertyName)) return

        Object.defineProperty(this.internalMock, propertyName, {
            get: this.createMethodStub(propertyName),
        })
    }

    private defineMockMethodStub(methodName: string): void {
        if (Object.hasOwn(this.internalMock, methodName)) return

        this.internalMock[methodName] = this.createMethodStub(methodName)
    }

    private createMethodStub(name: string): (...args: any[]) => any {
        return (...args: any[]) => {
            const matchers: Matcher[] = args.map(it => it instanceof Matcher ? it : eq(it))
            return new MethodStubBuilder(name, matchers, this.addMethodStub.bind(this))
        }
    }

    private addMethodStub<R>(stub: MethodStub<R>) {
        if (!this.methodStubs[stub.name]) {
            this.methodStubs[stub.name] = []
        }
        this.methodStubs[stub.name].push(stub)
    }

    private propertyIsExcluded(propertyName: string): boolean {
        return this.excludedPropertyNames.indexOf(propertyName) >= 0
    }

    private defineInstancePropertyExecutor(propertyName: string) {
        if (Object.hasOwn(this.instance, propertyName)) return

        Object.defineProperty(this.instance, propertyName, {
            get: this.createExecutor(propertyName),
        })
    }

    private defineInstanceMethodExecutor(propertyName: string): void {
        if (Object.hasOwn(this.instance, propertyName)) return

        this.instance[propertyName] = this.createExecutor(propertyName)
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
