import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { SimpleCallVerifier } from '@/callVerification/simple/verifiers/SimpleCallVerifier'
import { CallTracker } from '@/lib/CallTracker'

export class SimpleCallVerificator {
    constructor(private callTracker: CallTracker, private verifier: SimpleCallVerifier) {
        return new Proxy(this, {
            get: (target: SimpleCallVerificator, name: PropertyKey) => {
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
            const calls = this.callTracker.getMatchingCalls(nameToVerify, matchers)
            this.verifier.verify(this.callTracker, nameToVerify, matchers, calls)
        }
    }
}
