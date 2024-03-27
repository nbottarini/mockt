import { isObject } from './lib/isObject'

export class ObjectInspector {
    public getPrototypes(prototype: any): any[] {
        const prototypes: any[] = []
        while (isObject(prototype) && (prototype !== Object.prototype && prototype !== Function.prototype)) {
            prototypes.push(prototype)
            prototype = Object.getPrototypeOf(prototype)
        }
        return prototypes
    }

    public getOwnPropertyNames(object: any): string[] {
        return isObject(object) ? Object.getOwnPropertyNames(object) : []
    }
}
