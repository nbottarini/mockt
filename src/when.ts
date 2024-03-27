import { Mock } from './mock'
import { Mocker } from './Mocker'

export function when<T>(instance: T): Mock<T> {
    const mocker = (instance as any).__mocktMocker as Mocker<T>
    return mocker.mock
}
