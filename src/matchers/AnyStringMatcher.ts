import { Matcher } from './Matcher'

export class AnyString extends Matcher<any> {
    matches(value: any): boolean {
        const type = typeof value
        return type === 'string' || (
            type === 'object' && value != null && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object String]'
        )
    }

    toString() {
        return `anyString()`
    }
}

export function anyString(): any {
    return new AnyString()
}
