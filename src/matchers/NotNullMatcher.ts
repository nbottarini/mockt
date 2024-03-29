import { Matcher } from './Matcher'

export class NotNullMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value !== null
    }
}

export function notNull<T>(): T {
    return new NotNullMatcher<T>() as T
}
