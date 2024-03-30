import { Matcher } from './Matcher'

export class AnyArray extends Matcher<any> {
    matches(value: any): boolean {
        return Array.isArray(value)
    }
}

export function anyArray(): any {
    return new AnyArray()
}
