import { SimpleCallVerifier } from '@/callVerification/simple/verifiers/SimpleCallVerifier'
import { MethodCall } from '../../MethodCall'

export class OnceVerifier extends SimpleCallVerifier {
    protected isValid(calls: MethodCall[]): boolean {
        return calls.length === 1
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to be called once but has been called ${matchedCalls.length} time(s).`
    }
}
