import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { Invocation } from '../../Invocation'

export class OnceVerifier extends SimpleInvocationVerifier {
    protected isValid(invocations: Invocation[]): boolean {
        return invocations.length === 1
    }

    protected getErrorMessage(methodString: string, matchedCalls: Invocation[]): string {
        return `Expected "${methodString}" to be called once but has been called ${matchedCalls.length} time(s).`
    }
}
