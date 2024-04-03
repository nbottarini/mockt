import { SimpleCallVerifier } from '@/callVerification/simple/verifiers/SimpleCallVerifier'
import { MethodCall } from '../../MethodCall'

export class NeverVerifier extends SimpleCallVerifier {
    protected isValid(calls: MethodCall[]): boolean {
        return calls.length === 0
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to never been called but has been called ${matchedCalls.length} time(s).`
    }
}
