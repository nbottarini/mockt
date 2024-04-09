import { Mocker } from '@/Mocker'
import { Spy } from '@/spy/Spy'

export function getInvocationTracker(instance: any) {
    if (instance.__mocktMocker) return (instance.__mocktMocker as Mocker).invocationTracker
    if (instance.__mocktSpy) return (instance.__mocktSpy as Spy<any>).invocationTracker
    throw new Error('Error')
}