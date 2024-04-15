import { SequenceVerificator } from '@/verification/SequenceVerificator'

export function verifySequence(): SequenceVerificatorType {
    return new SequenceVerificator() as SequenceVerificatorType
}

export type SequenceVerificatorCallType<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => any)|Function) ? (...args: A) => SequenceVerificatorType : SequenceVerificatorType
} & {
    getProperty(name: keyof T): SequenceVerificatorType
    setProperty(name: keyof T, value: any): SequenceVerificatorType
}

export type SequenceVerificatorType = {
    call<T>(instance: T): SequenceVerificatorCallType<T>
}
