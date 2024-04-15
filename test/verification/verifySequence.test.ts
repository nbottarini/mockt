import { any, mockt, spy, verifySequence } from '../../src'

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
    myInterface.otherMethodThatReturns1()

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(myInterface).otherMethodThatReturns1()
})

it('fails if a call is not called with multiple expected calls', () => {
    myClassMock.methodThatReturns1()

    expect(() => {
        verifySequence()
            .call(myClassMock).methodThatReturns1()
            .call(myInterface).otherMethodThatReturns1()
    }).toThrow(
        `Expected "otherMethodThatReturns1()" to be called but has never been called.`
    )
})

it('success if all methods are called in order', () => {
    myClassMock.methodThatReturns1()
    myInterface.otherMethodThatReturnsParam(3)

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(myInterface).otherMethodThatReturnsParam(any())
})

it('success if all methods are called in order ignoring methods without matching args', () => {
    myClassMock.methodThatReturns1()
    myClassMock.methodThatReturns1()
    myClassMock.methodThatReturnsParam(2)
    myInterface.otherMethodThatReturnsParam(3)
    myInterface.otherMethodThatReturnsParam(5)

    verifySequence()
        .call(myClassMock).methodThatReturns1()
        .call(myInterface).otherMethodThatReturnsParam(5)
})

it('fails if wrong order', () => {
    myInterface.otherMethodThatReturnsParam(5)
    myClassMock.methodThatReturns1()

    expect(() => {
        verifySequence()
            .call(myClassMock).methodThatReturns1()
            .call(myInterface).otherMethodThatReturnsParam(5)
    }).toThrow(
        `Expected "otherMethodThatReturnsParam(eq(5))" to be called in the specified order.`
    )
})

it('with properties', () => {
    myInterface.otherMethodThatReturnsParam(3)
    // @ts-ignore
    const value = myClassMock.someProperty
    myInterface.otherMethodThatReturnsParam(5)

    verifySequence()
        .call(myClassMock).getProperty('someProperty')
        .call(myInterface).otherMethodThatReturnsParam(5)
})

it('with spies', () => {
    myInterface.otherMethodThatReturnsParam(3)
    mySpy.methodThatReturnsParam(10)

    verifySequence()
        .call(myInterface).otherMethodThatReturnsParam(any())
        .call(mySpy).methodThatReturnsParam(10)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
    myObject = new MyClass()
    mySpy = spy(myObject)
    myInterface = mockt<MyInterface>()
})

let myClassMock: MyClass
let myObject: MyClass
let mySpy: MyClass
let myInterface: MyInterface

class MyClass {
    someProperty: string = 'Hello'

    methodThatReturns1(): number {
        return 1
    }

    methodThatReturnsParam(param: number): number {
        return param
    }
}

interface MyInterface {
    otherMethodThatReturns1(): number

    otherMethodThatReturnsParam(param: number): number
}
