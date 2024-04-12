import { Mocker } from './Mocker'

export function when<T>(instance: T): MockStubbing<T> {
    const mocker = (instance as any).__mocktMocker as Mocker
    return mocker.mock
}

export type MethodStubBuilderType<R, ResolveType = void> = {
    returns(param?: R, ...rest: R[]): MethodStubBuilderType<R,  ResolveType>
    throws(error?: Error): MethodStubBuilderType<R,  ResolveType>
    resolves(param?: ResolveType, ...rest: ResolveType[]): MethodStubBuilderType<R,  ResolveType>
    rejects(error?: Error): MethodStubBuilderType<R,  ResolveType>
    calls(func: (...args: any[]) => R): MethodStubBuilderType<R,  ResolveType>
}

export type BehaviorSetter<R> = R extends Promise<infer ResolveType> ? MethodStubBuilderType<R, ResolveType> : MethodStubBuilderType<R>

export type FunctionToChangeBehavior<A extends any[], R> = (...args: A) => BehaviorSetter<R>

export type MockStubbing<T> = {
    [K in keyof T]: T[K] extends (((...args: infer A) => infer R)|Function) ? FunctionToChangeBehavior<A, R> : BehaviorSetter<T[K]>
}
