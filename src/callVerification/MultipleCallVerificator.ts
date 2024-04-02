import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { Verifier } from '@/callVerification/verifiers/Verifier'

export class MultipleCallVerificator {
    private callsToVerify: CallToVerify[] = []
    private proxy: MultipleCallVerificator

    constructor(private mocker: Mocker, private verifier: Verifier) {
        this.proxy = new Proxy(this, {
            get: (target: MultipleCallVerificator, name: PropertyKey) => {
                if (name in target) return target[name]
                return this.methodVerifier(name.toString())
            }
        })
        return this.proxy
    }

    called() {
        const failedCalls: CallToVerify[] = []
        for (let callToVerify of this.callsToVerify) {
            const calls = this.mocker.getMatchingCalls(callToVerify.name, callToVerify.matchers)
            if (calls.length === 0) {
                failedCalls.push(callToVerify)
            }
        }
        if (failedCalls.length > 0) {
            const message = 'Expected calls:\n' +
                this.callsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\n Missing calls:\n' +
                failedCalls.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getActualCallsMessage())
        }
    }

    calledInOrder() {
    }

    calledInSequence() {
    }

    protected getActualCallsMessage(): string {
        const methodCalls = this.mocker.getAllCalls()
        if (methodCalls.length === 0) return ''
        return `\nAll calls:\n` +
            methodCalls.map(m => `- ${m.toString()}\n`).join('')
    }

    private methodVerifier(name: string): any {
        return (...args: any[]) => {
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            this.callsToVerify.push(new CallToVerify(name, matchers))
            return this.proxy
        }
    }
}

class CallToVerify {
    constructor(
        readonly name: string,
        readonly matchers: Matcher<any>[],
    ) {}

    toString(): string {
        return `${this.name}(${this.matchers.map(a => a.toString()).join(', ')})`
    }
}
