import { Mocker } from '@/Mocker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'

export class CallVerifier {
    constructor(private mocker: Mocker) {
        return new Proxy(this, {
            get: (target: CallVerifier, name: PropertyKey) => {
                return this.methodVerifier(name.toString())
            }
        })
    }

    private methodVerifier(name: string): any {
        return (...args: any[]) => {
            const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
            const calls = this.mocker.getMatchingCalls(name, matchers)
            if (calls.length === 0) {
                const methodString = `${name}(${matchers.map(m => m.toString()).join(', ')})`
                throw new Error(`Expected "${methodString}" to be called.${this.getActualCallsMessage(name)}`)
            }
        }
    }

    private getActualCallsMessage(name: string): string {
        const methodCalls = this.mocker.getMethodCalls(name)
        if (methodCalls.length === 0) return ''
        return `\n\nActual calls:\n` +
            methodCalls.map(m => `- ${m.toString()}\n`)
    }
}
