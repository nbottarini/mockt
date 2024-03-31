import { Verifier } from '@/callVerification/verifiers/Verifier'
import { MethodCall } from '../MethodCall'

export class OnceVerifier extends Verifier {
    protected isValid(calls: MethodCall[]): boolean {
        return calls.length === 1
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to be called once but has been called ${matchedCalls.length} time(s).`
    }
}
