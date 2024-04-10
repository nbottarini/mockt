import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { Invocation } from '@/verification/Invocation'

export class NeverVerifier extends SimpleInvocationVerifier {
    protected isValid(invocations: Invocation[]): boolean {
        return invocations.length === 0
    }

    protected getErrorMessage(methodString: string, matchedCalls: Invocation[]): string {
        return `Expected "${methodString}" to never been called but has been called ${matchedCalls.length} time(s).`
    }
}
