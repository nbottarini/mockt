import { when } from '@/when'
import { mockt } from '../../../src'
import { isNil } from '@/matchers/IsNilMatcher'

it('matches when value is null', () => {
    when(myClassMock).method(isNil()).returns(5)

    const actual = myClassMock.method(null)

    expect(actual).toEqual(5)
})

it('matches when value is undefined', () => {
    when(myClassMock).method(isNil()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is not null or undefined', () => {
    when(myClassMock).method(isNil()).returns(5)

    const actual1 = myClassMock.method(new MyClass())
    const actual2 = myClassMock.method(2)

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
})

it('doesn\'t match when value is empty string', () => {
    when(myClassMock).method(isNil()).returns(5)

    const actual = myClassMock.method('')

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is empty array', () => {
    when(myClassMock).method(isNil()).returns(5)

    const actual = myClassMock.method([])

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
