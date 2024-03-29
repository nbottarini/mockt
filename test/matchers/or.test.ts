import { eq } from '@/matchers/EqualsMatcher'
import { when } from '@/when'
import { mockt } from '../../src'
import { or } from '@/matchers/OrMatcher'

it('matches when any matcher matches', () => {
    when(myClassMock).methodWithNumberParam(or(eq(2), eq(4), eq(6))).returns(3)

    const actual1 = myClassMock.methodWithNumberParam(2)
    const actual2 = myClassMock.methodWithNumberParam(4)
    const actual3 = myClassMock.methodWithNumberParam(6)

    expect(actual1).toEqual(3)
    expect(actual2).toEqual(3)
    expect(actual3).toEqual(3)
})

it('doesn\'t match when no matcher matches', () => {
    when(myClassMock).methodWithNumberParam(or(eq(2), eq(4))).returns(3)

    const actual = myClassMock.methodWithNumberParam(5)

    expect(actual).toBe(undefined)
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
