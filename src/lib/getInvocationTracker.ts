import { Mocker } from '@/Mocker'
import { Spy } from '@/spy/Spy'

export function getInvocationTracker(instance: any) {
    if (instance.__mocktMocker) return (instance.__mocktMocker as Mocker).invocationTracker
    if (instance instanceof Spy) return instance.invocationTracker
    // if (instance.__mocktSpy) return (instance.__mocktSpy as Spy<any>).invocationTracker
    throw new Error('Given instance is not a mock nor a spy')
}
