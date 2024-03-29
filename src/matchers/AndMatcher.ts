import { Matcher } from './Matcher'
import { EqualsMatcher } from '@/matchers/EqualsMatcher'

export class AndMatcher<T> extends Matcher<T> {
    private matchers: Matcher<T>[]

    constructor(...matchers: Matcher<T>[]) {
        super()
        this.matchers = matchers
    }

    matches(value: T): boolean {
        return this.matchers.every(m => m.matches(value))
    }
}

export function and<T>(...matchers: (Matcher<T>|T)[]): T {
    const resolvedMatchers = matchers.map(m => !(m instanceof Matcher)? new EqualsMatcher(m) : m)
    return new AndMatcher(...resolvedMatchers) as T
}
