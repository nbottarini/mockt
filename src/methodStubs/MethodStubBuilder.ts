import { Matcher } from '@/matchers/Matcher'
import { MethodStub } from '@/methodStubs/MethodStub'
import { ReturnValueMethodStub } from '@/methodStubs/ReturnValueMethodStub'
import { ThrowErrorMethodStub } from '@/methodStubs/ThrowErrorMethodStub'
import { ResolvePromiseMethodStub } from '@/methodStubs/ResolvePromiseMethodStub'
import { RejectPromiseMethodStub } from '@/methodStubs/RejectPromiseMethodStub'
import { CallFunctionMethodStub } from '@/methodStubs/CallFunctionMethodStub'

export class MethodStubBuilder<R, ResolveType = void> extends Function {
    private isFirstStub = true

    constructor(
        private mock: any,
        private methodName: string,
        private matchers: Matcher<any>[],
        private addMethodStub: (stub: MethodStub<R>, appendAnswer?: boolean) => void,
        private defineMockMethodStub: (methodName: string, force?: boolean) => void,
    ) {
        super()
        return new Proxy(this, {
            apply(target: MethodStubBuilder<R, ResolveType>, thisArg: any, argArray: any[]): MethodStubBuilder<R> {
                return target.__call(...argArray)
            }
        })
    }

    private doAddMethodStub(stub: MethodStub<R>) {
        const appendAnswer = !this.isFirstStub
        this.addMethodStub(stub, appendAnswer)
        this.isFirstStub = false
    }

    returns(param: R = undefined, ...rest: R[]): this {
        this.doAddMethodStub(new ReturnValueMethodStub(this.methodName, this.matchers, param))
        rest.forEach(value => {
            this.doAddMethodStub(new ReturnValueMethodStub(this.methodName, this.matchers, value))
        })
        return this
    }

    throws(error: Error = new Error('Some error')): this {
        this.doAddMethodStub(new ThrowErrorMethodStub(this.methodName, this.matchers, error))
        return this
    }

    resolves(param: ResolveType = undefined, ...rest: ResolveType[]): this {
        this.doAddMethodStub(new ResolvePromiseMethodStub(this.methodName, this.matchers, param))
        rest.forEach(value => {
            this.doAddMethodStub(new ResolvePromiseMethodStub(this.methodName, this.matchers, value))
        })
        return this
    }

    rejects(error: Error = new Error('Some error')): this {
        this.doAddMethodStub(new RejectPromiseMethodStub(this.methodName, this.matchers, error))
        return this
    }

    calls(func: (...args: any[]) => R): this {
        this.doAddMethodStub(new CallFunctionMethodStub(this.methodName, this.matchers, func))
        return this
    }

    // When is a function property we build the stub when is called as a function
    private __call(...args: any[]): MethodStubBuilder<any> {
        this.defineMockMethodStub(this.methodName, true)
        return this.mock[this.methodName](...args)
    }
}
