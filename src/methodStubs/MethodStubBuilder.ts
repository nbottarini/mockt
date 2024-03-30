import { Matcher } from '@/matchers/Matcher'
import { MethodStub } from './MethodStub'
import { ReturnValueMethodStub } from './ReturnValueMethodStub'
import { ThrowErrorMethodStub } from '@/methodStubs/ThrowErrorMethodStub'
import { ResolvePromiseMethodStub } from '@/methodStubs/ResolvePromiseMethodStub'
import { RejectPromiseMethodStub } from '@/methodStubs/RejectPromiseMethodStub'
import { CallFunctionMethodStub } from '@/methodStubs/CallFunctionMethodStub'

export class MethodStubBuilder<R, ResolveType = void> extends Function {
    constructor(
        private mock: any,
        private methodName: string,
        private matchers: Matcher<any>[],
        private addMethodStub: (stub: MethodStub<R>) => void,
        private defineMockMethodStub: (methodName: string, force?: boolean) => void,
    ) {
        super()
        return new Proxy(this, {
            apply(target: MethodStubBuilder<R, ResolveType>, thisArg: any, argArray: any[]): MethodStubBuilder<R> {
                return target.__call(...argArray)
            }
        })
    }

    returns(param: R, ...rest: R[]): this {
        this.addMethodStub(new ReturnValueMethodStub(this.methodName, this.matchers, param))
        rest.forEach(value => {
            this.addMethodStub(new ReturnValueMethodStub(this.methodName, this.matchers, value))
        })
        return this
    }

    throws(error: Error): this {
        this.addMethodStub(new ThrowErrorMethodStub(this.methodName, this.matchers, error))
        return this
    }

    resolves(param: ResolveType, ...rest: ResolveType[]): this {
        this.addMethodStub(new ResolvePromiseMethodStub(this.methodName, this.matchers, param))
        rest.forEach(value => {
            this.addMethodStub(new ResolvePromiseMethodStub(this.methodName, this.matchers, value))
        })
        return this
    }

    rejects(error: Error): this {
        this.addMethodStub(new RejectPromiseMethodStub(this.methodName, this.matchers, error))
        return this
    }

    calls(func: (...args: any[]) => R): this {
        this.addMethodStub(new CallFunctionMethodStub(this.methodName, this.matchers, func))
        return this
    }

    // When is a function property we build the stub when is called as a function
    __call(...args: any[]): MethodStubBuilder<any> {
        this.defineMockMethodStub(this.methodName, true)
        return this.mock[this.methodName](...args)
    }
}
