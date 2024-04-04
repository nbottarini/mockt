import { capture, mockt } from '../../src'

it('returns arguments of first method call', () => {
    myClassMock.methodThatReturnsParam(5, 'hi')
    myClassMock.methodThatReturnsParam(6, 'bye')

    const [value1, value2] = capture(myClassMock).methodThatReturnsParam
    expect(value1).toEqual(5)
    expect(value2).toEqual('hi')
})

it('returns undefined if method was not called', () => {
    const [value1, value2] = capture(myClassMock).methodThatReturnsParam
    expect(value1).toBe(undefined)
    expect(value2).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodThatReturnsParam(param1: number, param2: string): number {
        return param1
    }

    arrowMethod = (param1: number, param2: string) => param1
}
