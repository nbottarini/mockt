import { when } from '@/when'
import { mockt } from '../../src'
import { notNull } from '../../src/matchers/NotNullMatcher'

it('matches when value is not null', () => {
    when(myClassMock).method(notNull()).returns(5)

    const actual1 = myClassMock.method(new MyClass())
    const actual2 = myClassMock.method(2)

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is undefined', () => {
    when(myClassMock).method(notNull()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toEqual(5)
})

it('matches when value is empty string', () => {
    when(myClassMock).method(notNull()).returns(5)

    const actual = myClassMock.method('')

    expect(actual).toEqual(5)
})

it('matches when value is empty array', () => {
    when(myClassMock).method(notNull()).returns(5)

    const actual = myClassMock.method([])

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is null', () => {
    when(myClassMock).method(notNull()).returns(5)

    const actual = myClassMock.method(null)

    expect(actual).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(param: any): any {
        return param
    }
}
