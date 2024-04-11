import { InvocationTracker } from '@/lib/InvocationTracker'

export class UnknownResponse extends Function {
    constructor(propertyName: string, invocationTracker: InvocationTracker) {
        super()
        const nonTrackingProxy = new Proxy(this, {
            apply(target: UnknownResponse, thisArg: any, argArray: any[]): UnknownResponse {
                return nonTrackingProxy
            }
        })
        return new Proxy(nonTrackingProxy, {
            apply(target: UnknownResponse, thisArg: any, argArray: any[]): UnknownResponse {
                invocationTracker.add(propertyName, argArray)
                return nonTrackingProxy
            }
        })
    }
}
