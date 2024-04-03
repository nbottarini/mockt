import { SimpleCallVerifier } from '@/callVerification/simple/verifiers/SimpleCallVerifier'
import { MethodCall } from '../../MethodCall'

export class AtLeastOnceVerifier extends SimpleCallVerifier {
    protected isValid(calls: MethodCall[]): boolean {
        return calls.length > 0
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to be called but has never been called.`
    }
}
