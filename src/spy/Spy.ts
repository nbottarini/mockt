import { MethodCall } from '@/callVerification/MethodCall'
import { CallTracker } from '@/lib/CallTracker'

export class Spy<T extends object> {
    readonly instance: T
    readonly callTracker = new CallTracker()
    private mocktProperty = '__mocktSpy'

    constructor(instance: T) {
        this.instance = this.createInstanceProxy(instance)
    }

    private createInstanceProxy(instance: T): T {
        const proxy = new Proxy(instance, {
            get: (target: any, name: PropertyKey) => {
                const property = instance[name]
                if (typeof property === 'function')  {
                    return (...args: any[]) => {
                        this.callTracker.add(new MethodCall(name.toString(), args))
                        return property(...args)
                    }
                } else {
                    this.callTracker.add(new MethodCall(name.toString(), []))
                }
                return property
            },
            set: (target: any, name: PropertyKey, newValue: any) => {
                if (name !== this.mocktProperty) this.callTracker.add(new MethodCall('setProperty', [name, newValue]))
                target[name] = newValue
                return true
            }
        })
        proxy[this.mocktProperty] = this
        return proxy
    }
}
