import { Matcher } from './Matcher'

export class AnyObjectMatcher extends Matcher<any> {
    matches(value: any): boolean {
        const type = typeof value
        return type === 'object' && value != null && !Array.isArray(value)
    }
}

export function anyObject(): any {
    return new AnyObjectMatcher()
}
