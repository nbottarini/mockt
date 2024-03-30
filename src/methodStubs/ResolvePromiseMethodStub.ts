import { MethodStub } from './MethodStub'
import { Matcher } from '@/matchers/Matcher'

export class ResolvePromiseMethodStub<R> extends MethodStub<R> {
    constructor(name: string, matchers: Matcher<any>[], private value: R) {
        super(name, matchers)
    }

    execute(args: R[]): any {
        return Promise.resolve(this.value)
    }
}
