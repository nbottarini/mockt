import { isObject } from '@/lib/isObject'

export class ObjectInspector {
    private excludedPropertyNames = ['hasOwnProperty']

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

    public getAllPropertyNames(prototype: any): PropertyInfo[] {
        const names: PropertyInfo[] = []
        this.getPrototypes(prototype).forEach((obj) => {
            this.getOwnPropertyNames(obj).forEach((propertyName: string) => {
                if (this.propertyIsExcluded(propertyName)) return
                names.push({ obj, propertyName })
            })
        })
        return names
    }

    private propertyIsExcluded(propertyName: string): boolean {
        return this.excludedPropertyNames.indexOf(propertyName) >= 0
    }
}

export interface PropertyInfo {
    obj: any
    propertyName: string
}
