import { Matcher } from './Matcher'

export class RangeMatcher extends Matcher<number> {
    constructor(private from: number, private to: number) {
        super()
    }

    matches(value: number): boolean {
        return value <= this.to && value >= this.from
    }

    toString() {
        return `range(${this.from}, ${this.to})`
    }
}

export function range(from: number, to: number): number {
    return (new RangeMatcher(from, to) as any) as number
}
