import { Matcher } from './Matcher'

export class AnyFunctionMatcher extends Matcher<any> {
    matches(value: any): boolean {
        return typeof value === 'function'
    }
}

export function anyFunction(): any {
    return new AnyFunctionMatcher()
}
