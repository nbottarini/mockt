import { Matcher } from './Matcher'

export class NotNilMatcher<T> extends Matcher<T> {
    matches(value: T): boolean {
        return value !== null && value !== undefined
    }
}

export function notNil<T>(): T {
    return new NotNilMatcher<T>() as T
}
