import { getInvocationTracker } from '@/lib/getInvocationTracker'
import { Matcher } from '@/matchers/Matcher'
import { eq } from '@/matchers/EqualsMatcher'

export class SequenceVerificator {
    private lastGlobalCallIndex = -1

    call(instance: any) {
        const invocationTracker = getInvocationTracker(instance)
        return new Proxy({}, {
            get: (target: any, name: PropertyKey) => {
                const propertyName = name.toString()
                return (...args: any[]) => {
                    const matchers = args.map(it => it instanceof Matcher ? it : eq(it))
                    let invocations = invocationTracker.getMatchingInvocations(propertyName, matchers)
                    if (invocations.length === 0) {
                        const methodString = `${propertyName}(${matchers.map(m => m.toString()).join(', ')})`
                        throw new Error(`Expected "${methodString}" to be called but has never been called.\n`)
                    }
                    invocations = invocations.filter(it => it.globalIndex > this.lastGlobalCallIndex)
                    if (invocations.length === 0) {
                        const methodString = `${propertyName}(${matchers.map(m => m.toString()).join(', ')})`
                        throw new Error(`Expected "${methodString}" to be called in the specified order.\n`)
                    }
                    this.lastGlobalCallIndex = invocations[0].globalIndex
                    return this
                }
            }
        })
    }
}
