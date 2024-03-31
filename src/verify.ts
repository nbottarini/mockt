import { Mocker } from '@/Mocker'
import { SimpleCallVerificator } from '@/callVerification/SimpleCallVerificator'
import { AtLeastOnceVerifier } from '@/callVerification/verifiers/AtLeastOnceVerifier'
import { OnceVerifier } from '@/callVerification/verifiers/OnceVerifier'
import { NeverVerifier } from '@/callVerification/verifiers/NeverVerifier'
import { TimesVerifier } from '@/callVerification/verifiers/TimesVerifier'
import { AtLeastVerifier } from '@/callVerification/verifiers/AtLeastVerifier'
import { AtMostVerifier } from '@/callVerification/verifiers/AtMostVerifier'

export function verify<T>(instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastOnceVerifier()) as any as MockVerifying<T>
}

export function verifyOnce<T>(instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new OnceVerifier()) as any as MockVerifying<T>
}

export function verifyNever<T>(instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new NeverVerifier()) as any as MockVerifying<T>
}

export function verifyTimes<T>(times: number, instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new TimesVerifier(times)) as any as MockVerifying<T>
}

export function verifyAtLeast<T>(times: number, instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastVerifier(times)) as any as MockVerifying<T>
}

export function verifyAtMost<T>(times: number, instance: T): MockVerifying<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtMostVerifier(times)) as any as MockVerifying<T>
}

export type MockVerifying<T> = {
    [K in keyof T]: T[K]
}
