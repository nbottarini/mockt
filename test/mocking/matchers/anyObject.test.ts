import { when } from '@/when'
import { anyObject, mockt } from '../../../src'

it('matches when value is an object literal', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual1 = myClassMock.method({})
    const actual2 = myClassMock.method({ name: 'Alice' })

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is an instance of a class', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual = myClassMock.method(new MyClass())

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is not an object', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual1 = myClassMock.method(3)
    const actual2 = myClassMock.method('some string')

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
})

it('doesn\'t match when value is undefined', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is null', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is an array', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual = myClassMock.method([])

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is a Function', () => {
    when(myClassMock).method(anyObject()).returns(5)

    const actual1 = myClassMock.method(() => {})
    const actual2 = myClassMock.method(function () {})

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
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
