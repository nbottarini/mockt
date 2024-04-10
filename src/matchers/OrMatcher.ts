import { Matcher } from '@/matchers/Matcher'
import { EqualsMatcher } from '@/matchers/EqualsMatcher'

export class OrMatcher<T> extends Matcher<T> {
    private matchers: Matcher<T>[]

    constructor(...matchers: Matcher<T>[]) {
        super()
        this.matchers = matchers
    }

    matches(value: T): boolean {
        return !!this.matchers.find(m => m.matches(value))
    }

    toString() {
        return `or(${this.matchers.map(m => m.toString()).join(', ')})`
    }
}

export function or<T>(...matchers: (Matcher<T>|T)[]): T {
    const resolvedMatchers = matchers.map(m => !(m instanceof Matcher)? new EqualsMatcher(m) : m)
    return new OrMatcher(...resolvedMatchers) as T
}
