import { mockt, verifyOnce } from '../../src'

it('success if called exactly once', () => {
    myClassMock.methodThatReturnsParam(2)

    verifyOnce(myClassMock).methodThatReturnsParam(2)
})

it('success if called once with matching param', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(3)

    verifyOnce(myClassMock).methodThatReturnsParam(3)
})

it('fails if not called', () => {
    expect(() => verifyOnce(myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called once but has been called 0 time(s).`
    )
})

it('fails if called multiple times', () => {
    myClassMock.methodThatReturnsParam(2)
    myClassMock.methodThatReturnsParam(2)

    expect(() => verifyOnce(myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called once but has been called 2 time(s).\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(2)\n` +
        `- methodThatReturnsParam(2)\n`
    )
})

it('with interfaces', () => {
    myInterface.method()

    verifyOnce(myInterface).method()
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
    myInterface = mockt<MyInterface>()
})

let myClassMock: MyClass
let myInterface: MyInterface

class MyClass {
    methodThatReturnsParam(param: number): number {
        return param
    }
}

interface MyInterface {
    method(): number
}
