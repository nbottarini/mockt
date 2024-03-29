import { Matcher } from './Matcher'

export class AnyMatcher extends Matcher {
    matches(value: any): boolean {
        return true
    }
}

export function any() {
    return new AnyMatcher()
}
