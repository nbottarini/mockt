import { when } from '@/when'
import { mockt } from '../../src'
import { range } from '@/matchers/RangeMatcher'

it('matches when value is between than given range', () => {
    when(myClassMock).method(range(5, 10)).returns(5)

    const actual1 = myClassMock.method(9)
    const actual2 = myClassMock.method(6)

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is equal to max value', () => {
    when(myClassMock).method(range(5, 10)).returns(5)

    const actual = myClassMock.method(10)

    expect(actual).toEqual(5)
})

it('matches when value is equal to min value', () => {
    when(myClassMock).method(range(5, 10)).returns(5)

    const actual = myClassMock.method(5)

    expect(actual).toEqual(5)
})

it('doesn\'t matches when value is greater than given range', () => {
    when(myClassMock).method(range(5, 10)).returns(5)

    const actual = myClassMock.method(11)

    expect(actual).toBe(undefined)
})

it('doesn\'t matches when value is less than given range', () => {
    when(myClassMock).method(range(5, 10)).returns(5)

    const actual = myClassMock.method(4)

    expect(actual).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(param: number): number {
        return param
    }
}