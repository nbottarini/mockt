import { mockt, verifyAtLeast } from '../../src'

it('success if called at least given times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    verifyAtLeast(2, myClassMock).methodThatReturnsParam(2)
})

it('success if called exactly given times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    verifyAtLeast(2, myClassMock).methodThatReturnsParam(2)
})

it('success if called at least given times with matching params', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)
    myClassMock.methodThatReturnsParam(2)

    verifyAtLeast(2, myClassMock).methodThatReturnsParam(2)
})

it('fails if called less times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)

    expect(() => verifyAtLeast(2, myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to been called at least 2 time(s) but has been called 1 time(s).\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(2)\n` +
        `- methodThatReturnsParam(3)\n`
    )
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodThatReturnsParam(param: number): number {
        return param
    }
}
