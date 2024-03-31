import { Mocker } from '@/Mocker'
import { AtLeastOnceVerifier } from '@/callVerification/verifiers/AtLeastOnceVerifier'
import { MultipleCallVerificator } from '@/callVerification/MultipleCallVerificator'

export function verifyMulti<T>(instance: T): MockMultiVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new MultipleCallVerificator(mocker, new AtLeastOnceVerifier()) as any as MockMultiVerificator<T>
}

export type MockMultiVerificator<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => any)|Function) ? (...args: A) => MockMultiVerificator<T> : MockMultiVerificator<T>
} & {
    getProperty(name: keyof T): MockMultiVerificator<T>
    setProperty(name: keyof T, value: any): MockMultiVerificator<T>
    called(): void
    calledInOrder(): void
    calledInSequence(): void
}
