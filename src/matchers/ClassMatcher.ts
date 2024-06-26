import { Matcher } from '@/matchers/Matcher'

export class ClassMatcher<T> extends Matcher<T> {
    constructor(private expectedClass: abstract new (...args: any[]) => T) {
        super()
    }

    matches(value: any): boolean {
        return value instanceof this.expectedClass
    }

    toString() {
        return `ofClass(${this.expectedClass.constructor.toString()})`
    }
}

export function ofClass<T>(expectedClass: abstract new (...args: any[]) => T): T {
    return new ClassMatcher<T>(expectedClass) as T
}
