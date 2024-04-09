import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { Invocation } from '../../Invocation'

export class AtLeastVerifier extends SimpleInvocationVerifier {
    constructor(private times: number) {
        super()
    }

    protected isValid(invocations: Invocation[]): boolean {
        return invocations.length >= this.times
    }

    protected getErrorMessage(methodString: string, matchedCalls: Invocation[]): string {
        return `Expected "${methodString}" to been called at least ${this.times} time(s) but has been called ${matchedCalls.length} time(s).`
    }
}
