import { mockt, verifyAtMost } from '../../src'

it('success if called at most given times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    verifyAtMost(3, myClassMock).methodThatReturnsParam(2)
})

it('success if called exactly given times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    verifyAtMost(3, myClassMock).methodThatReturnsParam(2)
})

it('success if called at most given times with matching params', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)

    verifyAtMost(3, myClassMock).methodThatReturnsParam(2)
})

it('fails if called more times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)

    expect(() => verifyAtMost(2, myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to been called at most 2 time(s) but has been called 3 time(s).\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(2)\n` +
        `- methodThatReturnsParam(2)\n` +
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
