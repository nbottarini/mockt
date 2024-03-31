import { Mocker } from '@/Mocker'
import { SimpleCallVerificator } from '@/callVerification/SimpleCallVerificator'
import { AtLeastOnceVerifier } from '@/callVerification/verifiers/AtLeastOnceVerifier'
import { OnceVerifier } from '@/callVerification/verifiers/OnceVerifier'
import { NeverVerifier } from '@/callVerification/verifiers/NeverVerifier'
import { TimesVerifier } from '@/callVerification/verifiers/TimesVerifier'
import { AtLeastVerifier } from '@/callVerification/verifiers/AtLeastVerifier'
import { AtMostVerifier } from '@/callVerification/verifiers/AtMostVerifier'

export function verify<T>(instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastOnceVerifier()) as any as MockVerificator<T>
}

export function verifyOnce<T>(instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new OnceVerifier()) as any as MockVerificator<T>
}

export function verifyNever<T>(instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new NeverVerifier()) as any as MockVerificator<T>
}

export function verifyTimes<T>(times: number, instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new TimesVerifier(times)) as any as MockVerificator<T>
}

export function verifyAtLeast<T>(times: number, instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastVerifier(times)) as any as MockVerificator<T>
}

export function verifyAtMost<T>(times: number, instance: T): MockVerificator<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtMostVerifier(times)) as any as MockVerificator<T>
}

export type MockVerificator<T> = {
    [K in keyof T]: T[K]
} & {
    getProperty(name: keyof T): void
    setProperty(name: keyof T, value: any): void
}
