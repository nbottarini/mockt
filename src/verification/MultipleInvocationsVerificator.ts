import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'
import { Invocation } from '@/verification/Invocation'
import { InvocationTracker } from '@/lib/InvocationTracker'

export class MultipleInvocationsVerificator {
    private invocationsToVerify: InvocationToVerify[] = []
    private readonly proxy: MultipleInvocationsVerificator

    constructor(private invocationTracker: InvocationTracker) {
        this.proxy = new Proxy(this, {
            get: (target: MultipleInvocationsVerificator, name: PropertyKey) => {
                if (name in target) return target[name]
                return this.methodVerifier(name.toString())
            }
        })
        return this.proxy
    }

    called() {
        this.failIfEmptyCallsToVerify()
        const failedCalls: InvocationToVerify[] = []
        for (let callToVerify of this.invocationsToVerify) {
            const calls = this.invocationTracker.getMatchingInvocations(callToVerify.name, callToVerify.matchers)
            if (calls.length === 0) {
                failedCalls.push(callToVerify)
            }
        }
        if (failedCalls.length > 0) {
            const message = 'Expected calls:\n' +
                this.invocationsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\nMissing calls:\n' +
                failedCalls.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    never() {
        this.failIfEmptyCallsToVerify()
        const failedCalls: Invocation[] = []
        for (let callToVerify of this.invocationsToVerify) {
            const calls = this.invocationTracker.getMatchingInvocations(callToVerify.name, callToVerify.matchers)
            if (calls.length > 0) {
                failedCalls.push(...calls)
            }
        }
        if (failedCalls.length > 0) {
            const message = 'Expected to never be called:\n' +
                this.invocationsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\nUnexpected calls:\n' +
                failedCalls.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    calledInOrder() {
        this.failIfEmptyCallsToVerify()
        // let pendingCallsToVerify = [...this.invocationsToVerify]
        // for (const call of this.invocationTracker.getAllCalls()) {
        //     const callToVerify = pendingCallsToVerify[0]
        //     if (call.name === callToVerify.name && call.matches(callToVerify.matchers)) {
        //         pendingCallsToVerify = pendingCallsToVerify.slice(1)
        //     }
        // }

        throw new Error('Not implemented')
    }

    calledInSequence() {
        this.failIfEmptyCallsToVerify()
        throw new Error('Not implemented')
    }

    private failIfEmptyCallsToVerify() {
        if (this.invocationsToVerify.length === 0) throw new Error('Must specify at least one method or property to verify')
    }

    protected getAllCallsMessage(): string {
        const invocations = this.invocationTracker.getAllInvocations()
        if (invocations.length === 0) return ''
        return `\nAll calls:\n` +
            invocations.map(m => `- ${m.toString()}\n`).join('')
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
            this.invocationsToVerify.push(new InvocationToVerify(nameToVerify, matchers))
            return this.proxy
        }
    }
}

class InvocationToVerify {
    constructor(
        readonly name: string,
        readonly matchers: Matcher<any>[],
    ) {}

    toString(): string {
        return `${this.name}(${this.matchers.map(a => a.toString()).join(', ')})`
    }
}
