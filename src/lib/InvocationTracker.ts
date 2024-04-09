import { Invocation } from '@/verification/Invocation'
import { Matcher } from '@/matchers/Matcher'

export class InvocationTracker {
    private invocations: Invocation[] = []

    add(invocation: Invocation): void {
        this.invocations.push(invocation)
    }

    getMatchingInvocations(name: string, matchers: Matcher<any>[]): Invocation[] {
        return this.invocations.filter(call => call.name === name && call.matches(matchers))
    }

    getInvocationsByName(name: string): Invocation[] {
        return this.invocations.filter(call => call.name === name)
    }

    getAllInvocations(): Invocation[] {
        return this.invocations
    }

    reset() {
        this.invocations = []
    }
}
