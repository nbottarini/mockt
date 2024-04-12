import { InvocationTracker } from '@/lib/InvocationTracker'

export class Spy<T extends object> {
    readonly instance: T
    readonly invocationTracker = new InvocationTracker()
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
                        this.invocationTracker.add(name.toString(), args)
                        return property(...args)
                    }
                } else {
                    this.invocationTracker.add('getProperty', [name.toString()])
                }
                return property
            },
            set: (target: any, name: PropertyKey, newValue: any) => {
                if (name !== this.mocktProperty) this.invocationTracker.add('setProperty', [name, newValue])
                target[name] = newValue
                return true
            }
        })
        proxy[this.mocktProperty] = this
        return proxy
    }
}
