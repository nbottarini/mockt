import { any, mockt, verifyMulti } from '../../src'

describe('verifyMulti called', () => {
    it('success if all methods called', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .called()
    })

    it('fails if some method is not called', () => {
        myClassMock.methodThatReturnsParam(3)

        expect(() => {
            verifyMulti(myClassMock)
                .methodThatReturns1()
                .methodThatReturnsParam(3)
                .called()
        }).toThrow(Error)
    })

    it('success if more methods are called', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturns1()

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(any())
            .called()
    })

    it('success if called in different order', () => {
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturns1()

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(any())
            .called()
    })
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
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

    arrowMethod = (a: number) => a
}
