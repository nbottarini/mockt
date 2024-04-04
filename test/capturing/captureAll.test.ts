import { captureAll, captureLast, mockt } from '../../src'

it('returns arguments of all method calls', () => {
    myClassMock.methodThatReturnsParam(5, 'hi')
    myClassMock.methodThatReturnsParam(6, 'bye')

    const args = captureAll(myClassMock).methodThatReturnsParam
    expect(args[0][0]).toEqual(5)
    expect(args[0][1]).toEqual('hi')
    expect(args[1][0]).toEqual(6)
    expect(args[1][1]).toEqual('bye')
})

it('returns empty array if method was not called', () => {
    const args = captureLast(myClassMock).methodThatReturnsParam
    expect(args.length).toEqual(0)
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
