/* eslint-disable no-redeclare */
import { Mocker } from '@/Mocker'

export function mockt<T>(clazz?: (new (...args: any[]) => T)): T
export function mockt<T>(clazz?: any): T
export function mockt<T>(clazz?: (new (...args: any[]) => T) | any): T {
    const mocker = new Mocker(clazz)
    return mocker.instance
}
