import { Mocker } from './Mocker'

export function mockt<T>(clazz?: (new (...args: any[]) => T)): T {
    const mocker = new Mocker<T>(clazz)
    return mocker.instance
}
