import { eq, mockt, verify } from '../../src'

it('method without params success if called', () => {
    myClassMock.methodThatReturns1()

    verify(myClassMock).methodThatReturns1()
})

it('method without params fails if not called', () => {
    expect(() => verify(myClassMock).methodThatReturns1()).toThrow(
        `Expected "methodThatReturns1()" to be called but has never been called.`
    )
})

it('method with params success if called with matching param', () => {
    myClassMock.methodThatReturnsParam(3)

    verify(myClassMock).methodThatReturnsParam(eq(3))
})

it('method with params success if called with non-matching param', () => {
    myClassMock.methodThatReturnsParam(3)

    expect(() => verify(myClassMock).methodThatReturnsParam(eq(2))).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called but has never been called.\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(3)\n`
    )
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodThatReturns1(): number {
        return 1
    }

    methodThatReturnsParam(param: number): number {
        return param
    }

    sum(a: number, b: number): number {
        return a + b
    }

    methodWithOptionalParam(a: number, b?: number): number|undefined {
        return b
    }

    arrowMethod = (a: number) => a
}
