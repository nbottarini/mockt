import { any, mockt, when } from '../../../src'

it('returns undefined when no value is specified', () => {
    when(myClassMock).method().returns()

    const actual = myClassMock.method()

    expect(actual).toEqual(undefined)
})

it('returns specified value', () => {
    when(myClassMock).method().returns(5)

    const actual = myClassMock.method()

    expect(actual).toEqual(5)
})

it('returns multiple values with single call', () => {
    when(myClassMock).method().returns(5, 6)

    const actual1 = myClassMock.method()
    const actual2 = myClassMock.method()

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(6)
})

it('returns last value when all returns are consumed', () => {
    when(myClassMock).method().returns(5, 6)

    myClassMock.method()
    myClassMock.method()
    const actual = myClassMock.method()

    expect(actual).toEqual(6)
})

it('overrides stub with multiple calls', () => {
    when(myClassMock).method().returns(5)
    when(myClassMock).method().returns(6)

    const actual1 = myClassMock.method()
    const actual2 = myClassMock.method()

    expect(actual1).toEqual(6)
    expect(actual2).toEqual(6)
})

it('don\'t override stub with different matchers', () => {
    when(myClassMock).methodWithParams(any(), 2).returns(5)
    when(myClassMock).methodWithParams(any(), 3).returns(6)

    const actual1 = myClassMock.methodWithParams('a', 2)
    const actual2 = myClassMock.methodWithParams('a', 3)

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(6)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(): any {
        return 1
    }

    methodWithParams(a: string, b: number): number {
        return b
    }
}
