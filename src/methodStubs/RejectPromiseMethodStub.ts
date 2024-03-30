import { MethodStub } from './MethodStub'
import { Matcher } from '@/matchers/Matcher'

export class RejectPromiseMethodStub extends MethodStub<any> {
    constructor(name: string, matchers: Matcher<any>[], private error: Error) {
        super(name, matchers)
    }

    execute(args: any[]): any {
        return Promise.reject(this.error)
    }
}
