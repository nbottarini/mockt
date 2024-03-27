import { Matcher } from '../matchers/Matcher'
import { MethodStub } from './MethodStub'
import { ReturnValueMethodStub } from './ReturnValueMethodStub'

export class MethodStubBuilder<R> {
    constructor(private name: string, private matchers: Matcher[], private addMethodStub: (stub: MethodStub<R>) => void) {
    }

    returns(...rest: R[]): this {
        rest.forEach(value => {
            this.addMethodStub(new ReturnValueMethodStub(this.name, this.matchers, value))
        })
        return this
    }
}
