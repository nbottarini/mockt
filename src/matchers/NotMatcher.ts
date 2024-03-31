import { Matcher } from './Matcher'
import { EqualsMatcher } from '@/matchers/EqualsMatcher'

export class NotMatcher<T> extends Matcher<T> {
    constructor(private inner: Matcher<T>) {
        super()
    }

    matches(value: T): boolean {
        return !this.inner.matches(value)
    }

    toString() {
        return `not(${this.inner.toString()})`
    }
}

export function not<T>(matcher: Matcher<T>|T): T {
    if (!(matcher instanceof Matcher)) return new NotMatcher(new EqualsMatcher(matcher)) as T
    return new NotMatcher(matcher) as T
}

export function neq<T>(expected: T): T {
    return not(new EqualsMatcher<T>(expected)) as T
}
