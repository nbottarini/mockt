import { MultipleInvocationsVerificator } from '@/verification/MultipleInvocationsVerificator'
import { getInvocationTracker } from '@/lib/getInvocationTracker'

export function verifyMulti<T>(instance: T): MultipleInvocationVerificatorType<T> {
    return new MultipleInvocationsVerificator(getInvocationTracker(instance)) as any as MultipleInvocationVerificatorType<T>
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
