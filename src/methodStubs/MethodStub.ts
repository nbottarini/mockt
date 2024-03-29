import { Matcher } from '@/matchers/Matcher'

export abstract class MethodStub<R> {
    protected constructor(readonly name: string, readonly matchers: Matcher<any>[]) {
    }

    matches(args: any[]): boolean {
        // Only match first matchers.length arguments
        return this.matchers.every((matcher, i) => matcher.matches(args[i]))
    }

    abstract execute(args: any[]): R
}
