import { mockt } from '@/mockt'
import { when } from '@/when'

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
        it('doesn\'t fail when not-stubbed', () => {
            expect(() =>  abstractClassMock.abstractMethod(2)).not.toThrow()
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
        abstractClassMock = mockt(AbstractClass)
    })
})

let abstractClassMock: AbstractClass

abstract class AbstractClass {
    abstract abstractMethod(param: number): number

    abstractClassMethod(param: number): number {
        return param
    }
}
