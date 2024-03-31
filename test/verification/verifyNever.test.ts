import { mockt, verifyNever } from '../../src'

it('success if never called', () => {
    verifyNever(myClassMock).methodThatReturnsParam(2)
})

it('success if called never with matching param', () => {
    myClassMock.methodThatReturnsParam(2)

    verifyNever(myClassMock).methodThatReturnsParam(3)
})

it('fails if called', () => {
    myClassMock.methodThatReturnsParam(2)

    expect(() => verifyNever(myClassMock).methodThatReturnsParam(2)).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to never been called but has been called 1 time(s).`
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
