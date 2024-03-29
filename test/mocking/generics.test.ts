import { mockt } from '@/mockt'
import { when } from '@/when'

describe('mocking generic class', () => {
    describe('method', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = genericClassMock.method(1)

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value if called with matching param value', () => {
            when(genericClassMock).method(1).returns(2)

            const actual = genericClassMock.method(1)

            expect(actual).toBe(2)
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(genericClassMock).method(1).returns(2)

            const actual = genericClassMock.method(5)

            expect(actual).toBe(undefined)
        })
    })

    describe('generic method', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = genericClassMock.genericMethod('some value')

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value if called with matching param value', () => {
            when(genericClassMock).genericMethod('some value').returns('other value')

            const actual = genericClassMock.genericMethod('some value')

            expect(actual).toBe('other value')
        })

        it('when stubbed returns undefined if called without matching param value', () => {
            when(genericClassMock).genericMethod('some value').returns('other value')

            const actual = genericClassMock.genericMethod('another value')

            expect(actual).toBe(undefined)
        })
    })

    beforeEach(() => {
        genericClassMock = mockt(GenericClass<number>)
    })
})

let genericClassMock: GenericClass<number>

class GenericClass<T> {
    method(param: T): T {
        return param
    }

    genericMethod<P>(param: P): P {
        return param
    }
}
