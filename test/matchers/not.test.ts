import { eq } from '@/matchers/EqualsMatcher'
import { when } from '@/when'
import { mockt } from '../../src'
import { not } from '../../src/matchers/NotMatcher'

it('matches when inner matcher not matches', () => {
    when(myClassMock).methodWithNumberParam(not(eq(2))).returns(3)

    const actual = myClassMock.methodWithNumberParam(3)

    expect(actual).toEqual(3)
})

it('doesn\'t match when inner matcher matches', () => {
    when(myClassMock).methodWithNumberParam(not(eq(2))).returns(3)

    const actual = myClassMock.methodWithNumberParam(2)

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
