import { Matcher } from './Matcher'

export class AnyMatcher extends Matcher {
    matches(value: any): boolean {
        return true
    }
}

export function any<T>(): T {
    return new AnyMatcher() as T
}
