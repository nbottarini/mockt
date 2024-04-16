import { isObject } from '@/lib/isObject'

export class ObjectInspector {
    private excludedPropertyNames = ['hasOwnProperty']

    public getPrototypes(object: any): any[] {
        const prototypes: any[] = []
        let current = object
        while (isObject(current) && (current !== Object.prototype && current !== Function.prototype)) {
            prototypes.push(current)
            current = Object.getPrototypeOf(current)
        }
        return prototypes
    }

    public getOwnPropertyNames(object: any): string[] {
        return isObject(object) ? Object.getOwnPropertyNames(object) : []
    }

    public getAllPropertyNames(object: any): PropertyInfo[] {
        const names: PropertyInfo[] = []
        this.getPrototypes(object).forEach((obj) => {
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
