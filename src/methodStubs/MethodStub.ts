import { Matcher } from '../matchers/Matcher'

export abstract class MethodStub<R> {
    protected constructor(readonly name: string, readonly matchers: Matcher[]) {
    }

    matches(args: any[]): boolean {
        // TODO: Ver caso de longitud distinta por parametros default, etc
        if (this.matchers.length !== args.length) return false
        return this.matchers.every((matcher, i) => matcher.matches(args[i]))
    }

    abstract execute(args: any[]): R
}
