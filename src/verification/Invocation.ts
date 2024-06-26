import { Matcher } from '@/matchers/Matcher'

let globalIndex = 0

export class Invocation {
    readonly globalIndex = globalIndex++

    constructor(readonly index: number, readonly name: string, readonly args: any[]) {
    }

    matches(matchers: Matcher<any>[]): boolean {
        // Only match first matchers.length arguments
        return matchers.every((matcher, i) => matcher.matches(this.args[i]))
    }

    toString(): string {
        return `${this.name}(${this.args.map(a => a.toString()).join(', ')})`
    }
}
