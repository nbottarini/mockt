import { SimpleCallVerificator } from '@/callVerification/simple/SimpleCallVerificator'
import { AtLeastOnceVerifier } from '@/callVerification/simple/verifiers/AtLeastOnceVerifier'
import { OnceVerifier } from '@/callVerification/simple/verifiers/OnceVerifier'
import { NeverVerifier } from '@/callVerification/simple/verifiers/NeverVerifier'
import { TimesVerifier } from '@/callVerification/simple/verifiers/TimesVerifier'
import { AtLeastVerifier } from '@/callVerification/simple/verifiers/AtLeastVerifier'
import { AtMostVerifier } from '@/callVerification/simple/verifiers/AtMostVerifier'
import { MultipleCallVerificator } from '@/callVerification/MultipleCallVerificator'
import { getCallTracker } from '@/lib/getCallTracker'

export function verify<T>(instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new AtLeastOnceVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyOnce<T>(instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new OnceVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyNever<T>(instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new NeverVerifier()) as any as SimpleCallVerificatorType<T>
}

export function verifyTimes<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new TimesVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyAtLeast<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new AtLeastVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyAtMost<T>(times: number, instance: T): SimpleCallVerificatorType<T> {
    return new SimpleCallVerificator(getCallTracker(instance), new AtMostVerifier(times)) as any as SimpleCallVerificatorType<T>
}

export function verifyMulti<T>(instance: T): MultipleCallVerificatorType<T> {
    return new MultipleCallVerificator(getCallTracker(instance)) as any as MultipleCallVerificatorType<T>
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
    never(): void
}
