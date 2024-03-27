import { Matcher } from './Matcher'
import isEqualWith from 'lodash.isequalwith'

export class EqualsMatcher extends Matcher {
    constructor(private expected: any) {
        super()
    }

    matches(value: any): boolean {
        return isEqualWith(
            this.expected,
            value,
            (a: any, b: any): boolean => {
                if (a instanceof Matcher) return a.matches(b)
                return undefined
            })
    }
}

export function eq(expected: any) {
    return new EqualsMatcher(expected)
}
