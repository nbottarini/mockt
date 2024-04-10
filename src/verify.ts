import { SimpleInvocationVerificator } from '@/verification/simple/SimpleInvocationVerificator'
import { AtLeastOnceVerifier } from '@/verification/simple/verifiers/AtLeastOnceVerifier'
import { OnceVerifier } from '@/verification/simple/verifiers/OnceVerifier'
import { NeverVerifier } from '@/verification/simple/verifiers/NeverVerifier'
import { TimesVerifier } from '@/verification/simple/verifiers/TimesVerifier'
import { AtLeastVerifier } from '@/verification/simple/verifiers/AtLeastVerifier'
import { AtMostVerifier } from '@/verification/simple/verifiers/AtMostVerifier'
import { MultipleInvocationsVerificator } from '@/verification/MultipleInvocationsVerificator'
import { getInvocationTracker } from '@/lib/getInvocationTracker'

export function verify<T>(instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new AtLeastOnceVerifier()) as any as SimpleInvocationVerificatorType<T>
}

export function verifyOnce<T>(instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new OnceVerifier()) as any as SimpleInvocationVerificatorType<T>
}

export function verifyNever<T>(instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new NeverVerifier()) as any as SimpleInvocationVerificatorType<T>
}

export function verifyTimes<T>(times: number, instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new TimesVerifier(times)) as any as SimpleInvocationVerificatorType<T>
}

export function verifyAtLeast<T>(times: number, instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new AtLeastVerifier(times)) as any as SimpleInvocationVerificatorType<T>
}

export function verifyAtMost<T>(times: number, instance: T): SimpleInvocationVerificatorType<T> {
    return new SimpleInvocationVerificator(getInvocationTracker(instance), new AtMostVerifier(times)) as any as SimpleInvocationVerificatorType<T>
}

export function verifyMulti<T>(instance: T): MultipleInvocationVerificatorType<T> {
    return new MultipleInvocationsVerificator(getInvocationTracker(instance)) as any as MultipleInvocationVerificatorType<T>
}

export type SimpleInvocationVerificatorType<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => any)|Function) ? (...args: A) => void : void
} & {
    getProperty(name: keyof T): void
    setProperty(name: keyof T, value: any): void
}

export type MultipleInvocationVerificatorType<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => any)|Function) ? (...args: A) => MultipleInvocationVerificatorType<T> : MultipleInvocationVerificatorType<T>
} & {
    getProperty(name: keyof T): MultipleInvocationVerificatorType<T>
    setProperty(name: keyof T, value: any): MultipleInvocationVerificatorType<T>
    called(): void
    calledInOrder(): void
    never(): void
}

export { MultipleInvocationsVerificator }
