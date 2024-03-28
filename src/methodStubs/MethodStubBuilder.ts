import { Matcher } from '@/matchers/Matcher'
import { MethodStub } from './MethodStub'
import { ReturnValueMethodStub } from './ReturnValueMethodStub'

export class MethodStubBuilder<R> extends Function {
    constructor(
        private mock: any,
        private methodName: string,
        private matchers: Matcher[],
        private addMethodStub: (stub: MethodStub<R>) => void,
        private defineMockMethodStub: (methodName: string, force?: boolean) => void,
    ) {
        super()
        return new Proxy(this, {
            apply(target: MethodStubBuilder<R>, thisArg: any, argArray: any[]): MethodStubBuilder<R> {
                return target.__call(...argArray)
            }
        })
    }

    returns(...rest: R[]): this {
        rest.forEach(value => {
            this.addMethodStub(new ReturnValueMethodStub(this.methodName, this.matchers, value))
        })
        return this
    }

    __call(...args: any[]): MethodStubBuilder<any> {
        this.defineMockMethodStub(this.methodName, true)
        return this.mock[this.methodName](...args)
        // // TODO: agregar al mock y/o a la interfaz. Caso de propiedades que en realidad son funciones
        // const matchers: Matcher[] = args.map(it => it instanceof Matcher ? it : eq(it))
        // return new MethodStubBuilder(this.methodName, matchers, this.addMethodStub)
    }
}
