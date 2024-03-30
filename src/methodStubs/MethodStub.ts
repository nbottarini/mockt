import { Matcher } from '@/matchers/Matcher'

export abstract class MethodStub<R> {
    private _isEnabled = true

    protected constructor(readonly name: string, readonly matchers: Matcher<any>[]) {
    }

    matches(args: any[]): boolean {
        // Only match first matchers.length arguments
        return this.matchers.every((matcher, i) => matcher.matches(args[i]))
    }

    get isEnabled(): boolean {
        return this._isEnabled
    }

    enable() {
        this._isEnabled = true
    }

    disable() {
        this._isEnabled = false
    }

    abstract execute(args: any[]): R
}
