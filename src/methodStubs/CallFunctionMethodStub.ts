import { MethodStub } from './MethodStub'
import { Matcher } from '@/matchers/Matcher'

export class CallFunctionMethodStub<R> extends MethodStub<R> {
    constructor(name: string, matchers: Matcher<any>[], private func: (...args: any[]) => R) {
        super(name, matchers)
    }

    execute(args: any[]): R {
        return this.func(...args)
    }
}
