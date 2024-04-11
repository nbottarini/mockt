import { mockt } from '@/mockt'
import { when } from '@/when'
import each from 'jest-each'

describe('mocking interface method', () => {
    describe('without params', () => {
        it('doesn\'t fail when not-stubbed', () => {
            expect(() =>  interfaceMock.methodThatReturns1()).not.toThrow()
        })

        it('when stubbed returns configured value', () => {
            when(interfaceMock).methodThatReturns1().returns(2)

            const actual = interfaceMock.methodThatReturns1()

            expect(actual).toBe(2)
        })
    })

    describe('with single param', () => {
        it('when stubbed returns configured value if called with matching param value', () => {
            when(interfaceMock).methodThatReturnsParam(1).returns(2)

            const actual = interfaceMock.methodThatReturnsParam(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(interfaceMock).methodThatReturnsParam(1).returns(2)

            const actual = interfaceMock.methodThatReturnsParam(5)

            expect(actual).toBe(undefined)
        })
    })

    describe('with multiple params', () => {
        it('when stubbed returns configured value if all params matches', () => {
            when(interfaceMock).sum(2, 3).returns(6)

            const actual = interfaceMock.sum(2, 3)

            expect(actual).toBe(6)
        })

        each([
            [1, 2],
            [2, 2],
            [1, 3],
        ]).it('when stubbed returns undefined if a param doesn\'t match', (a, b) => {
            when(interfaceMock).sum(2, 3).returns(6)

            const actual = interfaceMock.sum(a, b)

            expect(actual).toBe(undefined)
        })
    })

    describe('with optional param', () => {
        it('when stubbed with all params returns configured value if all params matches', () => {
            when(interfaceMock).methodWithOptionalParam(2, 3).returns(6)

            const actual = interfaceMock.methodWithOptionalParam(2, 3)

            expect(actual).toBe(6)
        })

        it('when stubbed with all params returns undefined if called without optional param', () => {
            when(interfaceMock).methodWithOptionalParam(2, 3).returns(6)

            const actual = interfaceMock.methodWithOptionalParam(2)

            expect(actual).toBe(undefined)
        })

        it('when stubbed without optional param returns configured value if called without optional param', () => {
            when(interfaceMock).methodWithOptionalParam(2).returns(6)

            const actual = interfaceMock.methodWithOptionalParam(2)

            expect(actual).toBe(6)
        })
    })

    describe('arrow method', () => {
        it('doesn\'t fail when not-stubbed', () => {
            expect(() =>  interfaceMock.arrowMethod(2)).not.toThrow()
        })

        it('when stubbed returns configured value', () => {
            when(interfaceMock).arrowMethod(1).returns(2)

            const actual = interfaceMock.arrowMethod(1)

            expect(actual).toBe(2)
        })
    })

    describe('inherited', () => {
        it('when stubbed returns configured value if called with matching param value', () => {
            when(interfaceMock).inheritedMethod(1).returns(2)

            const actual = interfaceMock.inheritedMethod(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(interfaceMock).inheritedMethod(1).returns(2)

            const actual = interfaceMock.inheritedMethod(5)

            expect(actual).toBe(undefined)
        })
    })

    it('doesn\'t fail when calling non-existent', () => {
        expect(() => interfaceMock['non-existent']()).not.toThrow()
    })

    beforeEach(() => {
        interfaceMock = mockt<MyInterface>()
    })
})

let interfaceMock: MyInterface

interface ParentInterface {
    inheritedMethod(param: number): number
}

interface MyInterface extends ParentInterface {
    methodThatReturns1(): number

    methodThatReturnsParam(param: number): number

    sum(a: number, b: number): number

    methodWithOptionalParam(a: number, b?: number): number|undefined

    arrowMethod: (a: number) => number

    property: string
}
