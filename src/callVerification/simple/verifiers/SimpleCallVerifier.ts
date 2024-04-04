import { MethodCall } from '@/callVerification/MethodCall'
import { Matcher } from '@/matchers/Matcher'
import { CallTracker } from '@/lib/CallTracker'

export abstract class SimpleCallVerifier {
    verify(callTracker: CallTracker, methodName: string, matchers: Matcher<any>[], matchedCalls: MethodCall[]) {
        if (this.isValid(matchedCalls)) return
        const methodString = `${methodName}(${matchers.map(m => m.toString()).join(', ')})`
        throw new Error(this.getErrorMessage(methodString, matchedCalls) + this.getActualCallsMessage(callTracker, methodName))
    }

    protected abstract getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string

    protected abstract isValid(calls: MethodCall[]): boolean

    protected getActualCallsMessage(callTracker: CallTracker, methodName: string): string {
        const methodCalls = callTracker.getMethodCalls(methodName)
        if (methodCalls.length === 0) return ''
        return `\n\nActual calls:\n` +
            methodCalls.map(m => `- ${m.toString()}\n`).join('')
    }
}
