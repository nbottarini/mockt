import { mockt } from '@/mockt'
import { reset, verifyOnce, when } from '../src'
import { resetCalls } from '@/resetCalls'

describe('resetCalls', () => {
    it('reset multiple returns', () => {
        when(myClassMock).method().returns(5, 6)
        myClassMock.method()

        resetCalls(myClassMock)
        const actual = myClassMock.method()

        expect(actual).toEqual(5)
    })

    it('reset calls', () => {
        myClassMock.method()

        resetCalls(myClassMock)
        myClassMock.method()

        verifyOnce(myClassMock).method()
    })
})

describe('reset', () => {
    it('clears all stubs', () => {
        when(myClassMock).method().returns(5)

        reset(myClassMock)
        const actual = myClassMock.method()

        expect(actual).toBe(undefined)
    })

    it('allows to start stubbing again', () => {
        when(myClassMock).method().returns(5)
        reset(myClassMock)
        when(myClassMock).method().returns(6)

        const actual = myClassMock.method()

        expect(actual).toEqual(6)
    })

    it('reset calls', () => {
        myClassMock.method()

        reset(myClassMock)
        myClassMock.method()

        verifyOnce(myClassMock).method()
    })
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(): any {
        return 1
    }
}
