import { Mocker } from '@/Mocker'
import { Spy } from '@/spy/Spy'

export function getCallTracker(instance: any) {
    if (instance.__mocktMocker) return (instance.__mocktMocker as Mocker).callTracker
    if (instance.__mocktSpy) return (instance.__mocktSpy as Spy<any>).callTracker
    throw new Error('Error')
}