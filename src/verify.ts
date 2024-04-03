import { Mocker } from '@/Mocker'
import { SimpleCallVerificator } from '@/callVerification/simple/SimpleCallVerificator'
import { AtLeastOnceVerifier } from '@/callVerification/simple/verifiers/AtLeastOnceVerifier'
import { OnceVerifier } from '@/callVerification/simple/verifiers/OnceVerifier'
import { NeverVerifier } from '@/callVerification/simple/verifiers/NeverVerifier'
import { TimesVerifier } from '@/callVerification/simple/verifiers/TimesVerifier'
import { AtLeastVerifier } from '@/callVerification/simple/verifiers/AtLeastVerifier'
import { AtMostVerifier } from '@/callVerification/simple/verifiers/AtMostVerifier'
import { MultipleCallVerificator } from '@/callVerification/MultipleCallVerificator'

export function verify<T>(instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastOnceVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyOnce<T>(instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new OnceVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyNever<T>(instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new NeverVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyTimes<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new TimesVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyAtLeast<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtLeastVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyAtMost<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new SimpleCallVerificator(mocker, new AtMostVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyMulti<T>(instance: T): MultipleCallVerificatorType<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return new MultipleCallVerificator(mocker) as any as MultipleCallVerificatorType<T>
}

export type SimpleCallVerificatorType<T> = {
    [K in keyof T]: T[K]
} & {
    getProperty(name: keyof T): void
    setProperty(name: keyof T, value: any): void
}

export type MultipleCallVerificatorType<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => any)|Function) ? (...args: A) => MultipleCallVerificatorType<T> : MultipleCallVerificatorType<T>
} & {
    getProperty(name: keyof T): MultipleCallVerificatorType<T>
    setProperty(name: keyof T, value: any): MultipleCallVerificatorType<T>
    called(): void
    calledInOrder(): void
    calledInSequence(): void
}
