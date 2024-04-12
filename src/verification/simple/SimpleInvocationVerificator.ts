import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { InvocationTracker } from '@/lib/InvocationTracker'

export class SimpleInvocationVerificator {
    constructor(private invocationTracker: InvocationTracker, private verifier: SimpleInvocationVerifier) {
        return new Proxy(this, {
            get: (target: SimpleInvocationVerificator, name: PropertyKey) => {
                return this.methodVerifier(name.toString())
            }
        })
    }

    private methodVerifier(name: string): any {
        return (...args: any[]) => {
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            const invocations = this.invocationTracker.getMatchingInvocations(name, matchers)
            this.verifier.verify(this.invocationTracker, name, matchers, invocations)
        }
    }
}
