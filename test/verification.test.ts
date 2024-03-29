import { mockt } from '@/mockt'

describe.skip('verify', () => {
    it('method without params', () => {
        myClassMock.methodThatReturns1()

        // verify(myClassMock).methodThatReturns1())
    })

    beforeEach(() => {
        myClassMock = mockt(MyClass)
    })
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
