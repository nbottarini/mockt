import { when } from '@/when'
import { anyArray, mockt } from '../../src'

it('matches when value is an array literal', () => {
    when(myClassMock).method(anyArray()).returns(5)

    const actual1 = myClassMock.method([])
    const actual2 = myClassMock.method([1, 2])

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is an array instance', () => {
    when(myClassMock).method(anyArray()).returns(5)

    // noinspection JSPrimitiveTypeWrapperUsage
    const actual = myClassMock.method(new Array())

    expect(actual).toEqual(5)
})

it('doesn\'t match when value is not an array', () => {
    when(myClassMock).method(anyArray()).returns(5)

    const actual1 = myClassMock.method(3)
    const actual2 = myClassMock.method('some string')
    const actual3 = myClassMock.method(new MyClass())

    expect(actual1).toBe(undefined)
    expect(actual2).toBe(undefined)
    expect(actual3).toBe(undefined)
})

it('doesn\'t match when value is undefined', () => {
    when(myClassMock).method(anyArray()).returns(5)

    const actual = myClassMock.method(undefined)

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is null', () => {
    when(myClassMock).method(anyArray()).returns(5)

    const actual = myClassMock.method(undefined)

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
