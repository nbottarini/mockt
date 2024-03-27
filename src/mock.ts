import { MethodStubBuilder } from './methodStubs/MethodStubBuilder'

export type BehaviorSetter<R> = MethodStubBuilder<R>

export type FunctionToChangeBehavior<A extends any[], R> = (...args: A) => BehaviorSetter<R>

export type Mock<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ? FunctionToChangeBehavior<A, R> : BehaviorSetter<T[K]>
}
