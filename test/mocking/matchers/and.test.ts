import { when } from '@/when'
import { and, mockt, neq } from '../../../src'

it('matches when all matcher matches', () => {
    when(myClassMock).methodWithNumberParam(and(neq(2), neq(4), neq(6))).returns(3)

    const actual1 = myClassMock.methodWithNumberParam(5)
    const actual2 = myClassMock.methodWithNumberParam(7)

    expect(actual1).toEqual(3)
    expect(actual2).toEqual(3)
})

it('doesn\'t match when a matcher matches', () => {
    when(myClassMock).methodWithNumberParam(and(neq(2), neq(4))).returns(3)

    const actual1 = myClassMock.methodWithNumberParam(2)
    const actual2 = myClassMock.methodWithNumberParam(4)

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodWithNumberParam(param: number): number {
        return param
    }
}
