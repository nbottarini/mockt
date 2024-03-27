import { MethodStub } from './MethodStub'
import { Matcher } from '../matchers/Matcher'

export class ReturnValueMethodStub<R> extends MethodStub<R> {
    constructor(name: string, matchers: Matcher[], private value: R) {
        super(name, matchers)
    }

    execute(args: any[]): R {
        return this.value
    }
}
