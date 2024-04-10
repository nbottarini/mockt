import { Matcher } from '@/matchers/Matcher'

export class IdenticalMatcher<T> extends Matcher<T> {
    constructor(private expected: T) {
        super()
    }

    matches(value: T): boolean {
        return value === this.expected
    }

    toString() {
        // TODO: Improve expected to string by type
        return `is(${this.expected.toString()})`
    }
}

export function is<T>(expected: T): T {
    return new IdenticalMatcher<T>(expected) as T
}
