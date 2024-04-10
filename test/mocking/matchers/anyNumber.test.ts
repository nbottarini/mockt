import { when } from '@/when'
import { anyNumber, mockt } from '../../../src'

it('matches when value is a numeric literal', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual1 = myClassMock.method(2)
    const actual2 = myClassMock.method(3.14)

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is a number object', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    // noinspection JSPrimitiveTypeWrapperUsage
    const actual = myClassMock.method(new Number(3))

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is not a number', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual1 = myClassMock.method(new MyClass())
    const actual2 = myClassMock.method('some string')
    const actual3 = myClassMock.method('3')

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
    expect(actual3).toBe(undefined)
})

it('doesn\'t match when value is undefined', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is null', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is empty array', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual = myClassMock.method([])

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is a numeric string', () => {
    when(myClassMock).method(anyNumber()).returns(5)

    const actual = myClassMock.method('5')

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
