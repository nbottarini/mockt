import { mockt } from '@/mockt'
import { when } from '@/when'
import each from 'jest-each'

describe('mocking class method', () => {
    describe('without params', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = myClassMock.methodThatReturns1()

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).methodThatReturns1().returns(2)

            const actual = myClassMock.methodThatReturns1()

            expect(actual).toBe(2)
        })
    })

    describe('with single param', () => {
        it('when stubbed returns configured value if called with matching param value', () => {
            when(myClassMock).methodThatReturnsParam(1).returns(2)

            const actual = myClassMock.methodThatReturnsParam(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(myClassMock).methodThatReturnsParam(1).returns(2)

            const actual = myClassMock.methodThatReturnsParam(5)

            expect(actual).toBe(undefined)
        })
    })

    describe('with multiple params', () => {
        it('when stubbed returns configured value if all params matches', () => {
            when(myClassMock).sum(2, 3).returns(6)

            const actual = myClassMock.sum(2, 3)

            expect(actual).toBe(6)
        })

        each([
            [1, 2],
            [2, 2],
            [1, 3],
        ]).it('when stubbed returns undefined if a param doesn\'t match', (a, b) => {
            when(myClassMock).sum(2, 3).returns(6)

            const actual = myClassMock.sum(a, b)

            expect(actual).toBe(undefined)
        })
    })

    describe('with optional param', () => {
        it('when stubbed with all params returns configured value if all params matches', () => {
            when(myClassMock).methodWithOptionalParam(2, 3).returns(6)

            const actual = myClassMock.methodWithOptionalParam(2, 3)

            expect(actual).toBe(6)
        })

        it('when stubbed with all params returns undefined if called without optional param', () => {
            when(myClassMock).methodWithOptionalParam(2, 3).returns(6)

            const actual = myClassMock.methodWithOptionalParam(2)

            expect(actual).toBe(undefined)
        })

        it('when stubbed without optional param returns configured value if called without optional param', () => {
            when(myClassMock).methodWithOptionalParam(2).returns(6)

            const actual = myClassMock.methodWithOptionalParam(2)

            expect(actual).toBe(6)
        })
    })

    describe('inherited', () => {
        it('when stubbed returns configured value if called with matching param value', () => {
            when(myClassMock).inheritedMethod(1).returns(2)

            const actual = myClassMock.inheritedMethod(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(myClassMock).inheritedMethod(1).returns(2)

            const actual = myClassMock.inheritedMethod(5)

            expect(actual).toBe(undefined)
        })
    })

    it.skip('calling non-existent method throws TypeError', () => {
        expect(() => myClassMock['non-existent']()).toThrow(TypeError)
    })

    beforeEach(() => {
        myClassMock = mockt(MyClass)
    })
})

describe('mocking abstract class', () => {
    describe('method', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = abstractClassMock.abstractClassMethod(1)

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value if called with matching param value', () => {
            when(abstractClassMock).abstractClassMethod(1).returns(2)

            const actual = abstractClassMock.abstractClassMethod(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(abstractClassMock).abstractClassMethod(1).returns(2)

            const actual = abstractClassMock.abstractClassMethod(5)

            expect(actual).toBe(undefined)
        })
    })

    describe('abstract method', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = abstractClassMock.abstractMethod(1)

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value if called with matching param value', () => {
            when(abstractClassMock).abstractMethod(1).returns(2)

            const actual = abstractClassMock.abstractMethod(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(abstractClassMock).abstractMethod(1).returns(2)

            const actual = abstractClassMock.abstractMethod(5)

            expect(actual).toBe(undefined)
        })
    })

    beforeEach(() => {
        abstractClassMock = mockt(ParentClass)
    })
})

describe('mocking interface method', () => {
    describe('without params', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = interfaceMock.methodThatReturns1()

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value', () => {
            when(interfaceMock).methodThatReturns1().returns(2)

            const actual = interfaceMock.methodThatReturns1()

            expect(actual).toBe(2)
        })
    })

    beforeEach(() => {
        interfaceMock = mockt<MyInterface>()
    })
})

let myClassMock: MyClass
let abstractClassMock: ParentClass
let interfaceMock: MyInterface

abstract class ParentClass {
    inheritedMethod(param: number): number {
        return param
    }

    abstract abstractMethod(param: number): number

    abstractClassMethod(param: number): number {
        return param
    }
}

class MyClass extends ParentClass {
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

    abstractMethod(param: number): number {
        return param
    }
}

interface MyInterface {
    methodThatReturns1(): number

    methodThatReturnsParam(param: number): number

    sum(a: number, b: number): number

    methodWithOptionalParam(a: number, b?: number): number|undefined
}
