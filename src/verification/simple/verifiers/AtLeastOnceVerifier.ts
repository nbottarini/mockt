import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { Invocation } from '../../Invocation'

export class AtLeastOnceVerifier extends SimpleInvocationVerifier {
    protected isValid(invocations: Invocation[]): boolean {
        return invocations.length > 0
    }

    protected getErrorMessage(methodString: string, matchedCalls: Invocation[]): string {
        return `Expected "${methodString}" to be called but has never been called.`
    }
}
