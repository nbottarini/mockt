import { Matcher } from './Matcher'

export class IdenticalMatcher<T> extends Matcher<T> {
    constructor(private expected: T) {
        super()
    }

    matches(value: T): boolean {
        return value === this.expected
    }
}

export function is<T>(expected: T): T {
    return new IdenticalMatcher<T>(expected) as T
}
