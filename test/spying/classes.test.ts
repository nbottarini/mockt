import { any, eq, neq, spy, verify } from '../../src'

it('method without params success if called', () => {
    const value = myObject.methodThatReturns1()

    verify(mySpy).methodThatReturns1()
    expect(value).toEqual(1)
})

it('method without params fails if not called', () => {
    expect(() => verify(mySpy).methodThatReturns1()).toThrow(
        `Expected "methodThatReturns1()" to be called but has never been called.`
    )
})

it('method with params success if called with matching param', () => {
    const value = myObject.methodThatReturnsParam(3)

    verify(mySpy).methodThatReturnsParam(neq(2))
    expect(value).toEqual(3)
})

it('method with params success if called with non-matching param', () => {
    myObject.methodThatReturnsParam(3)

    expect(() => verify(mySpy).methodThatReturnsParam(eq(2))).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called but has never been called.\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(3)\n`
    )
})

it('property get success if read', () => {
    // @ts-ignore
    const value = myObject.someProperty

    verify(mySpy).getProperty('someProperty')
})

it('property get fails if not read', () => {
    expect(() => verify(mySpy).getProperty('someProperty')).toThrow(
        `Expected "getProperty(eq(someProperty))" to be called but has never been called.`
    )
})

it('property with getter get success if read', () => {
    // @ts-ignore
    const value = myObject.otherProperty

    verify(mySpy).getProperty('otherProperty')
})

it('property with getter get fails if not read', () => {
    expect(() => verify(mySpy).getProperty('otherProperty')).toThrow(
        `Expected "getProperty(eq(otherProperty))" to be called but has never been called.`
    )
})

it('property set success if assigned', () => {
    myObject.someProperty = 'some value'

    verify(mySpy).setProperty('someProperty', 'some value')
    expect(myObject.someProperty).toEqual('some value')
})

it('property set fails if not assigned', () => {
    expect(() => verify(mySpy).setProperty('someProperty', any())).toThrow(
        `Expected "setProperty(eq(someProperty), any())" to be called but has never been called.`
    )
})

it('property with setter set success if assigned', () => {
    myObject.otherProperty = 'some value'

    verify(mySpy).setProperty('otherProperty', 'some value')
    expect(myObject.otherProperty).toEqual('some value')
})

it('property with setter set fails if not assigned', () => {
    expect(() => verify(mySpy).setProperty('otherProperty', any())).toThrow(
        `Expected "setProperty(eq(otherProperty), any())" to be called but has never been called.`
    )
})

beforeEach(() => {
    myObject = new MyClass()
    mySpy = spy(myObject)
})

let myObject: MyClass
let mySpy: MyClass

class MyClass {
    someProperty: string = 'Hello'
    private _otherProperty: string = 'Hi'

    get otherProperty() {
        return this._otherProperty
    }

    set otherProperty(value) {
        this._otherProperty = value
    }

    methodThatReturns1(): number {
        return 1
    }

    methodThatReturnsParam(param: number): number {
        return param
    }
}
