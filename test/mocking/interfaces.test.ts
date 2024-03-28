import { mockt } from '@/mockt'
import { when } from '@/when'

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

let interfaceMock: MyInterface

interface MyInterface {
    methodThatReturns1(): number

    methodThatReturnsParam(param: number): number

    sum(a: number, b: number): number

    methodWithOptionalParam(a: number, b?: number): number|undefined
}
