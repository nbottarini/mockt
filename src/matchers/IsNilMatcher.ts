import { Matcher } from './Matcher'

export class IsNilMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value === null || value === undefined
    }

    toString() {
        return `isNil()`
    }
}

export function isNil<T>(): T {
    return new IsNilMatcher<T>() as T
}
