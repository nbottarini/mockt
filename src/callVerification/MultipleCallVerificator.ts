import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { MethodCall } from '@/callVerification/MethodCall'

export class MultipleCallVerificator {
    private callsToVerify: CallToVerify[] = []
    private proxy: MultipleCallVerificator

    constructor(private mocker: Mocker) {
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
                '\nMissing calls:\n' +
                failedCalls.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    never() {
        const failedCalls: MethodCall[] = []
        for (let callToVerify of this.callsToVerify) {
            const calls = this.mocker.getMatchingCalls(callToVerify.name, callToVerify.matchers)
            if (calls.length > 0) {
                failedCalls.push(...calls)
            }
        }
        if (failedCalls.length > 0) {
            const message = 'Expected to never be called:\n' +
                this.callsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\nUnexpected calls:\n' +
                failedCalls.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    calledInOrder() {
    }

    calledInSequence() {
    }

    protected getAllCallsMessage(): string {
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
