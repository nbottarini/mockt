import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { Verifier } from '@/callVerification/verifiers/Verifier'

export class SimpleCallVerificator {
    constructor(private mocker: Mocker, private verifier: Verifier) {
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
            const calls = this.mocker.getMatchingCalls(nameToVerify, matchers)
            this.verifier.verify(this.mocker, nameToVerify, matchers, calls)
        }
    }
}
