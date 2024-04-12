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
        this.failIfEmptyInvocationsToVerify()
        const failedInvocations: InvocationToVerify[] = []
        for (let invocationToVerify of this.invocationsToVerify) {
            const invocations = this.invocationTracker.getMatchingInvocations(invocationToVerify.name, invocationToVerify.matchers)
            if (invocations.length === 0) {
                failedInvocations.push(invocationToVerify)
            }
        }
        if (failedInvocations.length > 0) {
            const message = 'Expected calls:\n' +
                this.invocationsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\nMissing calls:\n' +
                failedInvocations.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    never() {
        this.failIfEmptyInvocationsToVerify()
        const failedInvocations: Invocation[] = []
        for (let invocationToVerify of this.invocationsToVerify) {
            const invocations = this.invocationTracker.getMatchingInvocations(invocationToVerify.name, invocationToVerify.matchers)
            if (invocations.length > 0) {
                failedInvocations.push(...invocations)
            }
        }
        if (failedInvocations.length > 0) {
            const message = 'Expected to never be called:\n' +
                this.invocationsToVerify.map(m => `- ${m.toString()}\n`).join('') +
                '\nUnexpected calls:\n' +
                failedInvocations.map(m => `- ${m.toString()}\n`).join('')
            throw new Error(message + this.getAllCallsMessage())
        }
    }

    calledInOrder() {
        this.failIfEmptyInvocationsToVerify()
        let lastIndex = -1
        for (let invocationToVerify of this.invocationsToVerify) {
            const invocations = this.invocationTracker
                .getMatchingInvocations(invocationToVerify.name, invocationToVerify.matchers)
                .filter(it => it.index > lastIndex)
            if (invocations.length === 0) {
                const methodString = `${invocationToVerify.name}(${invocationToVerify.matchers.map(m => m.toString()).join(', ')})`
                const message = `Expected "${methodString}" to be called in the specified order.\n`
                throw new Error(message + this.getAllCallsMessage())
            }
            lastIndex = invocations[0].index
        }
    }

    private failIfEmptyInvocationsToVerify() {
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
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            this.invocationsToVerify.push(new InvocationToVerify(name, matchers))
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
