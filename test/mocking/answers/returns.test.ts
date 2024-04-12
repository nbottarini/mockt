import { mockt, when } from '../../../src'

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

it('returns multiple values with multiple calls', () => {
    when(myClassMock).method().returns(5)
    when(myClassMock).method().returns(6)

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

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(): any {
        return 1
    }
}
