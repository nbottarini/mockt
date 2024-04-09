import { getInvocationTracker } from '@/lib/getInvocationTracker'
import { Invocation } from '@/verification/Invocation'

export function capture<T extends object>(instance: T): CaptureType<T> {
    return captureFirst(instance)
}

export function captureFirst<T extends object>(instance: T): CaptureType<T> {
    return createCaptureProxy(instance, calls => calls[0].args)
}

export function captureLast<T extends object>(instance: T): CaptureType<T> {
    return createCaptureProxy(instance, calls => calls[calls.length - 1].args)
}

export function captureAll<T extends object>(instance: T): MultiCaptureType<T> {
    return createCaptureProxy(instance, calls => calls.map(it => it.args))
}

function createCaptureProxy(instance: any, returnFunc: (calls: Invocation[]) => any): any {
    const callTracker = getInvocationTracker(instance)

    return new Proxy({}, {
        get(target: any, property: PropertyKey): any {
            const propertyName = property.toString()
            if (propertyName === 'setProperty') {
                return (name: string) => {
                    const allCalls = callTracker.getInvocationsByName(propertyName)
                        .filter(it => it.args[0] === name)
                    if (allCalls.length === 0) return []
                    return returnFunc(allCalls.map(it => new Invocation(it.name, [it.args[1]])))
                }
            }

            const allCalls = callTracker.getInvocationsByName(propertyName)
            if (allCalls.length === 0) return []
            return returnFunc(allCalls)
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
