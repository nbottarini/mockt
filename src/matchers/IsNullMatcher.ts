import { Matcher } from './Matcher'

export class IsNullMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value === null
    }

    toString() {
        return `isNull()`
    }
}

export function isNull<T>(): T {
    return new IsNullMatcher<T>() as T
}
