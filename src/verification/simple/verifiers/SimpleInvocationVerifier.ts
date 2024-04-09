import { Invocation } from '@/verification/Invocation'
import { Matcher } from '@/matchers/Matcher'
import { InvocationTracker } from '@/lib/InvocationTracker'

export abstract class SimpleInvocationVerifier {
    verify(invocationTracker: InvocationTracker, methodName: string, matchers: Matcher<any>[], invocations: Invocation[]) {
        if (this.isValid(invocations)) return
        const methodString = `${methodName}(${matchers.map(m => m.toString()).join(', ')})`
        throw new Error(this.getErrorMessage(methodString, invocations) + this.getActualInvocationsMessage(invocationTracker, methodName))
    }

    protected abstract getErrorMessage(methodString: string, matchedCalls: Invocation[]): string

    protected abstract isValid(calls: Invocation[]): boolean

    protected getActualInvocationsMessage(invocationTracker: InvocationTracker, methodName: string): string {
        const invocations = invocationTracker.getInvocationsByName(methodName)
        if (invocations.length === 0) return ''
        return `\n\nActual calls:\n` +
            invocations.map(m => `- ${m.toString()}\n`).join('')
    }
}
