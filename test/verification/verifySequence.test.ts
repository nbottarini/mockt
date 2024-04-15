import { any, mockt, verifySequence } from '../../src'

it('success if simple call is called', () => {
    myClassMock.methodThatReturns1()

    verifySequence()
        .call(myClassMock).methodThatReturns1()
})

it('fails if simple call is not called', () => {
    myClassMock.methodThatReturnsParam(3)

    expect(() => {
        verifySequence()
            .call(myClassMock).methodThatReturns1()
    }).toThrow(
        `Expected "methodThatReturns1()" to be called but has never been called.`
    )
})

it('success if multiple calls are called', () => {
    myClassMock.methodThatReturns1()
    otherClassMock.otherMethodThatReturns1()

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(otherClassMock).otherMethodThatReturns1()
})

it('fails if a call is not called with multiple expected calls', () => {
    myClassMock.methodThatReturns1()

    expect(() => {
        verifySequence()
            .call(myClassMock).methodThatReturns1()
            .call(otherClassMock).otherMethodThatReturns1()
    }).toThrow(
        `Expected "otherMethodThatReturns1()" to be called but has never been called.`
    )
})

it('success if all methods are called in order', () => {
    myClassMock.methodThatReturns1()
    otherClassMock.otherMethodThatReturnsParam(3)

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(otherClassMock).otherMethodThatReturnsParam(any())
})

it('success if all methods are called in order ignoring methods without matching args', () => {
    myClassMock.methodThatReturns1()
    myClassMock.methodThatReturns1()
    myClassMock.methodThatReturnsParam(2)
    otherClassMock.otherMethodThatReturnsParam(3)
    otherClassMock.otherMethodThatReturnsParam(5)

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(otherClassMock).otherMethodThatReturnsParam(5)
})

it('fails if wrong order', () => {
    otherClassMock.otherMethodThatReturnsParam(5)
    myClassMock.methodThatReturns1()

    expect(() => {
        verifySequence()
            .call(myClassMock).methodThatReturns1()
            .call(otherClassMock).otherMethodThatReturnsParam(5)
    }).toThrow(
        `Expected "otherMethodThatReturnsParam(eq(5))" to be called in the specified order.`
    )
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
    otherClassMock = mockt(MyClass)
})

let myClassMock: MyClass
let otherClassMock: OtherClass

class MyClass {
    someProperty: string = 'Hello'

    methodThatReturns1(): number {
        return 1
    }

    methodThatReturnsParam(param: number): number {
        return param
    }
}

class OtherClass {
    otherMethodThatReturns1(): number {
        return 1
    }

    otherMethodThatReturnsParam(param: number): number {
        return param
    }
}
