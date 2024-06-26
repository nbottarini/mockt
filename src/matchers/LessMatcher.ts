import { Matcher } from '@/matchers/Matcher'

export class LessMatcher extends Matcher<number> {
    constructor(private max: number) {
        super()
    }

    matches(value: number): boolean {
        return value <= this.max
    }

    toString() {
        return `less(${this.max})`
    }
}

export function less(max: number): number {
    return (new LessMatcher(max) as any) as number
}
