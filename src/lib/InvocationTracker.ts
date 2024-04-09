import { Invocation } from '@/verification/Invocation'
import { Matcher } from '@/matchers/Matcher'

export class InvocationTracker {
    private invocations: Invocation[] = []

    add(name: string, args: any[]): void {
        this.invocations.push(new Invocation(this.invocations.length, name, args))
    }

    getMatchingInvocations(name: string, matchers: Matcher<any>[]): Invocation[] {
        return this.invocations.filter(invocation => invocation.name === name && invocation.matches(matchers))
    }

    getInvocationsByName(name: string): Invocation[] {
        return this.invocations.filter(invocation => invocation.name === name)
    }

    getAllInvocations(): Invocation[] {
        return this.invocations
    }

    reset() {
        this.invocations = []
    }
}
