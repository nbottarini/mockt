import { any, eq, neq, spy, verify } from '../../src'

it('method without params success if called', () => {
    const value = mySpy.methodThatReturns1()

    verify(mySpy).methodThatReturns1()
    expect(value).toEqual(1)
})

it('method without params fails if not called', () => {
    expect(() => verify(mySpy).methodThatReturns1()).toThrow(
        `Expected "methodThatReturns1()" to be called but has never been called.`
    )
})

it('method with params success if called with matching param', () => {
    const value = mySpy.methodThatReturnsParam(3)

    verify(mySpy).methodThatReturnsParam(neq(2))
    expect(value).toEqual(3)
})

it('method with params success if called with non-matching param', () => {
    mySpy.methodThatReturnsParam(3)

    expect(() => verify(mySpy).methodThatReturnsParam(eq(2))).toThrow(
        `Expected "methodThatReturnsParam(eq(2))" to be called but has never been called.\n\n` +
        `Actual calls:\n` +
        `- methodThatReturnsParam(3)\n`
    )
})

it('property get success if read', () => {
    // @ts-ignore
    const value = mySpy.someProperty

    verify(mySpy).getProperty('someProperty')
})

it('property get fails if not read', () => {
    expect(() => verify(mySpy).getProperty('someProperty')).toThrow(
        `Expected "getProperty(eq(someProperty))" to be called but has never been called.`
    )
})

it('property set success if assigned', () => {
    mySpy.someProperty = 'some value'

    verify(mySpy).setProperty('someProperty', 'some value')
    expect(mySpy.someProperty).toEqual('some value')
})

it('property set fails if not assigned', () => {
    expect(() => verify(mySpy).setProperty('someProperty', any())).toThrow(
        `Expected "setProperty(eq(someProperty), any())" to be called but has never been called.`
    )
})

beforeEach(() => {
    mySpy = spy({
        someProperty: 'Hello',
        methodThatReturns1: () => 1,
        methodThatReturnsParam: (param: number) => param,
    })
})

let mySpy: any
