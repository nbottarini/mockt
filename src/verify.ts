import { Mocker } from '@/Mocker'
import { CallVerifier } from '@/callVerification/CallVerifier'

export function verify<T>(instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new CallVerifier(mocker) as any as MockVerifying<T>
}

export type MockVerifying<T> = {
    [K in keyof T]: T[K]
}
