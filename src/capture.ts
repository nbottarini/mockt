import { getCallTracker } from '@/lib/getCallTracker'
import { MethodCall } from '@/callVerification/MethodCall'

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

function createCaptureProxy(instance: any, returnFunc: (calls: MethodCall[]) => any): any {
    const callTracker = getCallTracker(instance)

    return new Proxy({}, {
        get(target: any, property: PropertyKey): any {
            const propertyName = property.toString()
            if (propertyName === 'setProperty') {
                return (name: string) => {
                    const allCalls = callTracker.getMethodCalls(propertyName)
                        .filter(it => it.args[0] === name)
                    if (allCalls.length === 0) return []
                    return returnFunc(allCalls.map(it => new MethodCall(it.name, [it.args[1]])))
                }
            }

            const allCalls = callTracker.getMethodCalls(propertyName)
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
