import { Matcher } from '@/matchers/Matcher'
import isEqualWith from 'lodash.isequalwith'

export abstract class MethodStub<R> {
    protected constructor(readonly name: string, readonly matchers: Matcher<any>[]) {
    }

    matches(args: any[]): boolean {
        // Only match first matchers.length arguments
        return this.matchers.every((matcher, i) => matcher.matches(args[i]))
    }

    hasSameMatchers(other: MethodStub<any>) {
        if (this.matchers.length != other.matchers.length) return false
        return this.matchers.every((matcher, i) => isEqualWith(matcher, other.matchers[i]))
    }

    abstract execute(args: any[]): R
}
