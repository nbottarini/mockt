import { Mocker } from './Mocker'

export function reset<T>(instance: T) {
    const mocker = (instance as any).__mocktMocker as Mocker
    mocker.reset()
}
