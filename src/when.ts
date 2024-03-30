import { Mocker } from './Mocker'
import { MethodStubBuilder } from '@/methodStubs/MethodStubBuilder'

export function when<T>(instance: T): MockStubbing<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return mocker.mock
}

export type BehaviorSetter<R> = R extends Promise<infer ResolveType> ? MethodStubBuilder<R, ResolveType> : MethodStubBuilder<R>

export type FunctionToChangeBehavior<A extends any[], R> = (...args: A) => BehaviorSetter<R>

export type MockStubbing<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => infer R)|Function) ? FunctionToChangeBehavior<A, R> : BehaviorSetter<T[K]>
}
