import { Matcher } from './Matcher'

export class LessMatcher extends Matcher<number> {
    constructor(private max: number) {
        super()
    }

    matches(value: number): boolean {
        return value <= this.max
    }
}

export function less(max: number): number {
    return (new LessMatcher(max) as any) as number
}
