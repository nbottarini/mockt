import { when } from '@/when'
import { anyFunction, mockt } from '../../src'

it('matches when value is a function literal', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual1 = myClassMock.method(() => {})
    const actual2 = myClassMock.method(function() {})

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is a function reference', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual = myClassMock.method(Math.round)

    expect(actual).toEqual(5)
})

it('matches when value is an instance of a Function', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual = myClassMock.method(new Function())

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is not a function', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual1 = myClassMock.method(3)
    const actual2 = myClassMock.method('some string')
    const actual3 = myClassMock.method(new MyClass())

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
    expect(actual3).toBe(undefined)
})

it('doesn\'t match when value is undefined', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is null', () => {
    when(myClassMock).method(anyFunction()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is an array', () => {
    when(myClassMock).method(anyFunction()).returns(5)

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
