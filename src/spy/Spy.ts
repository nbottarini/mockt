import { InvocationTracker } from '@/lib/InvocationTracker'
import { ObjectInspector } from '@/lib/ObjectInspector'

export class Spy {
    readonly invocationTracker = new InvocationTracker()
    private inspector = new ObjectInspector()
    private originalProperties: Record<string, any> = {}

    constructor(instance: any) {
        this.spy(instance)
    }

    private spy(instance: any) {
        for (const { propertyName } of this.inspector.getAllPropertyNames(instance)) {
            if (propertyName === 'constructor') continue

            const property = instance[propertyName]
            this.originalProperties[propertyName] = property

            if (typeof property === 'function') {
                instance[propertyName] = this.spyFunction(propertyName)
            } else {
                this.spyProperty(instance, propertyName)
            }
        }
    }

    private spyFunction(name: string) {
        return (...args: any[]) => {
            this.invocationTracker.add(name, args)
            return this.originalProperties[name](...args)
        }
    }

    private spyProperty(instance: any, propertyName: string) {
        Object.defineProperty(instance, propertyName, {
            get: () => {
                this.invocationTracker.add('getProperty', [propertyName])
                return this.originalProperties[propertyName]
            },
            set: (newValue: any) => {
                this.invocationTracker.add('setProperty', [propertyName, newValue])
                this.originalProperties[propertyName] = newValue
            },
        })
    }
}
