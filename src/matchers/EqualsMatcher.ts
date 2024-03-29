import { Matcher } from './Matcher'
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
                return undefined
            })
    }
}

export function eq<T>(expected: T): T {
    return new EqualsMatcher<T>(expected) as T
}
