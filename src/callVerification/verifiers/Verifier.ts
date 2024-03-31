import { MethodCall } from '@/callVerification/MethodCall'
import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'

export abstract class Verifier {
    verify(mocker: Mocker, methodName: string, matchers: Matcher<any>[], matchedCalls: MethodCall[]) {
        if (this.isValid(matchedCalls)) return
        const methodString = `${methodName}(${matchers.map(m => m.toString()).join(', ')})`
        throw new Error(this.getErrorMessage(methodString, matchedCalls) + this.getActualCallsMessage(mocker, methodName))
    }

    protected abstract getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string

    protected abstract isValid(calls: MethodCall[]): boolean

    protected getActualCallsMessage(mocker: Mocker, methodName: string): string {
        const methodCalls = mocker.getMethodCalls(methodName)
        if (methodCalls.length === 0) return ''
        return `\n\nActual calls:\n` +
            methodCalls.map(m => `- ${m.toString()}\n`).join('')
    }
}