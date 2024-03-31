import { Verifier } from '@/callVerification/verifiers/Verifier'
import { MethodCall } from '../MethodCall'

export class AtLeastOnceVerifier extends Verifier {
    protected isValid(calls: MethodCall[]): boolean {
        return calls.length > 0
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to be called but has never been called.`
    }
}
