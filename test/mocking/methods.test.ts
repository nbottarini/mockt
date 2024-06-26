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

        it('when stubbed without optional param matches any value for optional param', () => {
            when(myClassMock).methodWithOptionalParam(2).returns(6)

            const actual = myClassMock.methodWithOptionalParam(2, 9)

            expect(actual).toBe(6)
        })

        it('stubs match by last definition order', () => {
            when(myClassMock).methodWithOptionalParam(2, 9).returns(99)
            when(myClassMock).methodWithOptionalParam(2).returns(6)

            const actual = myClassMock.methodWithOptionalParam(2, 9)

            expect(actual).toBe(6)
        })
    })

    describe('arrow method', () => {
        it('doesn\'t fail when not-stubbed', () => {
            expect(() => myClassMock.arrowMethod(2)).not.toThrow()
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).arrowMethod(1).returns(2)

            const actual = myClassMock.arrowMethod(1)

            expect(actual).toBe(2)
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

    it('doesn\'t fail when calling non-existent method', () => {
        expect(() => myClassMock['non-existent']()).not.toThrow()
    })

    beforeEach(() => {
        myClassMock = mockt(MyClass)
    })
})

let myClassMock: MyClass

abstract class ParentClass {
    inheritedMethod(param: number): number {
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
        return a + b
    }

    arrowMethod = (a: number) => a
}
