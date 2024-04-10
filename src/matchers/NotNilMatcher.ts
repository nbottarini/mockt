import { Matcher } from '@/matchers/Matcher'

export class NotNilMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value !== null && value !== undefined
    }

    toString() {
        return `notNil()`
    }
}

export function notNil<T>(): T {
    return new NotNilMatcher<T>() as T
}
