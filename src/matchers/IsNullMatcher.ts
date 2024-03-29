import { Matcher } from './Matcher'

export class IsNullMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value === null
    }
}

export function isNull<T>(): T {
    return new IsNullMatcher<T>() as T
}
