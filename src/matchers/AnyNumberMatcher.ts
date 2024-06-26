import { Matcher } from '@/matchers/Matcher'

export class AnyNumber extends Matcher<any> {
    matches(value: any): boolean {
        const type = typeof value
        return type === 'number' || (
            type === 'object' && value != null && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object Number]'
        )
    }

    toString() {
        return `anyNumber()`
    }
}

export function anyNumber(): any {
    return new AnyNumber()
}
