import { Matcher } from './Matcher'

export class ClassMatcher<T> extends Matcher<T> {
    constructor(private expectedClass: abstract new (...args: any[]) => T) {
        super()
    }

    matches(value: any): boolean {
        return value instanceof this.expectedClass
    }
}

export function ofClass<T>(expectedClass: abstract new (...args: any[]) => T): T {
    return new ClassMatcher<T>(expectedClass) as T
}
