import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { SimpleInvocationVerifier } from '@/verification/simple/verifiers/SimpleInvocationVerifier'
import { InvocationTracker } from '@/lib/InvocationTracker'

export class SimpleInvocationVerificator {
    constructor(private callTracker: InvocationTracker, private verifier: SimpleInvocationVerifier) {
        return new Proxy(this, {
            get: (target: SimpleInvocationVerificator, name: PropertyKey) => {
                return this.methodVerifier(name.toString())
            }
        })
    }

    private methodVerifier(name: string): any {
        return (...args: any[]) => {
            let argsToVerify = args
            let nameToVerify = name
            if (name === 'getProperty') {
                argsToVerify = argsToVerify.slice(1)
                nameToVerify = args[0]
            }
            const matchers = argsToVerify.map(it => it instanceof Matcher ? it : eq(it))
            const calls = this.callTracker.getMatchingInvocations(nameToVerify, matchers)
            this.verifier.verify(this.callTracker, nameToVerify, matchers, calls)
        }
    }
}
