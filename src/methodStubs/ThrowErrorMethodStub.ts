import { MethodStub } from '@/methodStubs/MethodStub'
import { Matcher } from '@/matchers/Matcher'

export class ThrowErrorMethodStub extends MethodStub<any> {
    constructor(name: string, matchers: Matcher<any>[], private error: Error) {
        super(name, matchers)
    }

    execute(args: any[]): any {
        throw this.error
    }
}
