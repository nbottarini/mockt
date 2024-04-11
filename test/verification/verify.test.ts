import { any, eq, mockt, neq, verify } from '../../src'

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

    verify(myClassMock).methodThatReturnsParam(neq(2))
})

it('method with params success if called with non-matching param', () => {
    myClassMock.methodThatReturnsParam(3)

    expect(() => verify(myClassMock).methodThatReturnsParam(eq(2))).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called but has never been called.\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(3)\n`
    )
})

it('property get success if read', () => {
    // @ts-ignore
    const value = myClassMock.someProperty

    verify(myClassMock).getProperty('someProperty')
})

it('property get fails if not read', () => {
    expect(() => verify(myClassMock).getProperty('someProperty')).toThrow(
        `Expected "someProperty()" to be called but has never been called.`
    )
})

it('property set success if assigned', () => {
    myClassMock.someProperty = 'some value'

    verify(myClassMock).setProperty('someProperty', 'some value')
})

it('property set fails if not assigned', () => {
    expect(() => verify(myClassMock).setProperty('someProperty', any())).toThrow(
        `Expected "setProperty(eq(someProperty), any())" to be called but has never been called.`
    )
})

it('verify not stubbed method arguments', () => {
    myInterfaceMock.methodThatReturnsParam(3)

    verify(myInterfaceMock).methodThatReturnsParam(3)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
    myInterfaceMock = mockt<MyInterface>()
})

let myClassMock: MyClass
let myInterfaceMock: MyInterface

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
    methodThatReturnsParam(param: number): number
}
