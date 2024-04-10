import { Matcher } from '@/matchers/Matcher'

export class AnyArray extends Matcher<any> {
    matches(value: any): boolean {
        return Array.isArray(value)
    }

    toString() {
        return `anyArray()`
    }
}

export function anyArray(): any {
    return new AnyArray()
}
