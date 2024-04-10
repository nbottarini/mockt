import { Matcher } from '@/matchers/Matcher'

export class NotNullMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value !== null
    }

    toString() {
        return `notNull()`
    }
}

export function notNull<T>(): T {
    return new NotNullMatcher<T>() as T
}
