import { Matcher } from '@/matchers/Matcher'
import isEqualWith from 'lodash.isequalwith'

export class EqualsMatcher<T> extends Matcher<T> {
    constructor(private expected: T) {
        super()
    }

    matches(value: T): boolean {
        return isEqualWith(
            this.expected,
            value,
            (a: any, b: any): boolean => {
                if (a instanceof Matcher) return a.matches(b)
                if (a == b) return true
                return undefined
            })
    }

    toString() {
        // TODO: Improve expected to string by type
        return `eq(${this.expected.toString()})`
    }
}

export function eq<T>(expected: T): T {
    return new EqualsMatcher<T>(expected) as T
}
