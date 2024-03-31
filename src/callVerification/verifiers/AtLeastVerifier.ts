import { Verifier } from '@/callVerification/verifiers/Verifier'
import { MethodCall } from '../MethodCall'

export class AtLeastVerifier extends Verifier {
    constructor(private times: number) {
        super()
    }

    protected isValid(calls: MethodCall[]): boolean {
        return calls.length >= this.times
    }

    protected getErrorMessage(methodString: string, matchedCalls: MethodCall[]): string {
        return `Expected "${methodString}" to been called at least ${this.times} time(s) but has been called ${matchedCalls.length} time(s).`
    }
}
