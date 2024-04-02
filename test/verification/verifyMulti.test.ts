import { mockt } from '../../src'
import { verifyMulti } from '../../src/verifyMulti'

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
