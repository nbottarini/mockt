import { getCallTracker } from '@/lib/getCallTracker'
import { MethodCall } from '@/callVerification/MethodCall'

export function capture<T extends object>(instance: T): CaptureType<T> {
    return captureFirst(instance)
}

export function captureFirst<T extends object>(instance: T): CaptureType<T> {
    return createProxy(instance, calls => calls[0].args)
}

export function captureLast<T extends object>(instance: T): CaptureType<T> {
    return createProxy(instance, calls => calls[calls.length - 1].args)
}

export function captureAll<T extends object>(instance: T): MultiCaptureType<T> {
    return createProxy(instance, calls => calls.map(it => it.args))
}

function createProxy(instance: any, returnFunc: (calls: MethodCall[]) => any): any {
    const callTracker = getCallTracker(instance)
    return new Proxy({}, {
        get(target: any, property: PropertyKey): any {
            const allCalls = callTracker.getMethodCalls(property.toString())
            if (allCalls.length === 0) return []
            return returnFunc(allCalls)
        }
    })
}

export type CaptureType<T> = {
    [K in keyof T]: T[K] extends ((...args: infer A) => any) ? [...A] : void
} & {
    setProperty(name: keyof T): any
}


export type MultiCaptureType<T> = {
    [K in keyof T]: T[K] extends ((...args: infer A) => any) ? [...A][] : void
} & {
    setProperty(name: keyof T): any[]
}
