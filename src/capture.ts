import { getInvocationTracker } from '@/lib/getInvocationTracker'
import { Invocation } from '@/verification/Invocation'

export function capture<T extends object>(instance: T): CaptureType<T> {
    return captureFirst(instance)
}

export function captureFirst<T extends object>(instance: T): CaptureType<T> {
    return createCaptureProxy(instance, invocations => invocations[0].args)
}

export function captureLast<T extends object>(instance: T): CaptureType<T> {
    return createCaptureProxy(instance, invocations => invocations[invocations.length - 1].args)
}

export function captureAll<T extends object>(instance: T): MultiCaptureType<T> {
    return createCaptureProxy(instance, invocations => invocations.map(it => it.args))
}

function createCaptureProxy(instance: any, returnFunc: (invocations: Invocation[]) => any): any {
    const invocationTracker = getInvocationTracker(instance)

    return new Proxy({}, {
        get(target: any, property: PropertyKey): any {
            const propertyName = property.toString()
            if (propertyName === 'setProperty') {
                return (name: string) => {
                    const allInvocations = invocationTracker.getInvocationsByName(propertyName)
                        .filter(it => it.args[0] === name)
                    if (allInvocations.length === 0) return []
                    return returnFunc(allInvocations.map(it => new Invocation(it.index, it.name, [it.args[1]])))
                }
            }

            const allInvocations = invocationTracker.getInvocationsByName(propertyName)
            if (allInvocations.length === 0) return []
            return returnFunc(allInvocations)
        }
    })
}

export type CaptureType<T> = {
    [K in keyof T]: T[K] extends ((...args: infer A) => any) ? [...A] : void
} & {
    setProperty<K extends keyof T>(name: K): T[K][]
}

export type MultiCaptureType<T> = {
    [K in keyof T]: T[K] extends ((...args: infer A) => any) ? [...A][] : void
} & {
    setProperty<K extends keyof T>(name: K): T[K][][]
}
