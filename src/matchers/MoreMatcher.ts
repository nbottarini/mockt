import { Matcher } from './Matcher'

export class MoreMatcher extends Matcher<number> {
    constructor(private min: number) {
        super()
    }

    matches(value: number): boolean {
        return value >= this.min
    }
}

export function more(min: number): number {
    return (new MoreMatcher(min) as any) as number
}
