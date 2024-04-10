import { Matcher } from '@/matchers/Matcher'

export class AnyFunctionMatcher extends Matcher<any> {
    matches(value: any): boolean {
        return typeof value === 'function'
    }

    toString() {
        return `anyFunction()`
    }
}

export function anyFunction(): any {
    return new AnyFunctionMatcher()
}
