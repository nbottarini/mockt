import { Matcher } from './Matcher'

export class AnyMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return true
    }

    toString() {
        return `any()`
    }
}

export function any<T>(): T {
    return new AnyMatcher<T>() as T
}
