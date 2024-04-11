import { any, capture, mockt, when } from '../../src'

it('returns arguments of last method call', () => {
    myClassMock.methodThatReturnsParam(5, 'hi')
    myClassMock.methodThatReturnsParam(6, 'bye')

    const [value1, value2] = capture(myClassMock).methodThatReturnsParam

    expect(value1).toEqual(6)
    expect(value2).toEqual('bye')
})

it('returns undefined if method was not called', () => {
    const [value1, value2] = capture(myClassMock).methodThatReturnsParam
    expect(value1).toBe(undefined)
    expect(value2).toBe(undefined)
})

it('returns arguments of arrow method', () => {
    when(myClassMock).arrowMethod(any(), any()).returns(2)
    myClassMock.arrowMethod(5, 'hi')

    const [value1, value2] = capture(myClassMock).arrowMethod

    expect(value1).toEqual(5)
    expect(value2).toEqual('hi')
})

it('setter', () => {
    myClassMock.myProperty = 'other value'

    const [value] = capture(myClassMock).setProperty('myProperty')

    expect(value).toEqual('other value')
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    myProperty = 'value'

    methodThatReturnsParam(param1: number, param2: string): number {
        return param1
    }

    arrowMethod = (param1: number, param2: string) => param1
}
