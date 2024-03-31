import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { Verifier } from '@/callVerification/verifiers/Verifier'

export class MultipleCallVerificator {
    constructor(private mocker: Mocker, private verifier: Verifier) {
        return new Proxy(this, {
            get: (target: MultipleCallVerificator, name: PropertyKey) => {
                return this.methodVerifier(name.toString())
            }
        })
    }

    private methodVerifier(name: string): any {
        return (...args: any[]) => {
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            const calls = this.mocker.getMatchingCalls(name, matchers)
            this.verifier.verify(this.mocker, name, matchers, calls)
        }
    }
}
