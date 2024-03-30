import { Mocker } from './Mocker'

export function resetCalls<T>(instance: T) {
    const mocker = (instance as any).__mocktMocker as Mocker
    mocker.resetCalls()
}
