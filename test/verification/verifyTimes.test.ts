import { mockt, verifyTimes } from '../../src'

it('success if called exactly given times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    verifyTimes(2, myClassMock).methodThatReturnsParam(2)
})

it('success if called given times with matching params', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)
    myClassMock.methodThatReturnsParam(2)

    verifyTimes(2, myClassMock).methodThatReturnsParam(2)
})

it('fails if called less times', () => {
    myClassMock.methodThatReturnsParam(2)

    expect(() => verifyTimes(2, myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to been called 2 time(s) but has been called 1 time(s).`
    )
})

it('fails if called less times', () => {
    myClassMock.methodThatReturnsParam(2)

    expect(() => verifyTimes(2, myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to been called 2 time(s) but has been called 1 time(s).\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(2)\n`
    )
})

it('fails if called more times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    expect(() => verifyTimes(2, myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to been called 2 time(s) but has been called 3 time(s).\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(2)\n` +
        `- methodThatReturnsParam(2)\n` +
        `- methodThatReturnsParam(2)\n`
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
