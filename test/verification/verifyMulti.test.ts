import { any, mockt, neq, verifyMulti } from '../../src'

describe('verifyMulti called', () => {
    it('success if all methods are called', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .called()
    })

    it('success with getProperty and setProperty expectations', () => {
        // @ts-ignore
        const oldValue = myClassMock.someProperty
        myClassMock.someProperty = 'new value'

        verifyMulti(myClassMock)
            .getProperty('someProperty')
            .setProperty('someProperty', 'new value')
            .called()
    })

    it('fails if no method to verify', () => {
        expect(() => {
            verifyMulti(myClassMock).called()
        }).toThrow('Must specify at least one method or property to verify')
    })

    it('fails if any method is not called', () => {
        myClassMock.methodThatReturnsParam(3)

        expect(() => {
            verifyMulti(myClassMock)
                .methodThatReturns1()
                .methodThatReturnsParam(3)
                .called()
        }).toThrow(
            `Expected calls:\n` +
            `- methodThatReturns1()\n` +
            `- methodThatReturnsParam(eq(3))\n` +
            `\nMissing calls:\n` +
            `- methodThatReturns1()\n` +
            `\nAll calls:\n` +
            `- methodThatReturnsParam(3)\n`
        )
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

describe('verifyMulti never', () => {
    it('success if all methods are never called', () => {
        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .never()
    })

    it('fails if no method to verify', () => {
        expect(() => {
            verifyMulti(myClassMock).never()
        }).toThrow('Must specify at least one method or property to verify')
    })

    it('fails if any method is called', () => {
        myClassMock.methodThatReturnsParam(3)

        expect(() => {
            verifyMulti(myClassMock)
                .methodThatReturns1()
                .methodThatReturnsParam(3)
                .never()
        }).toThrow(
            `Expected to never be called:\n` +
            `- methodThatReturns1()\n` +
            `- methodThatReturnsParam(eq(3))\n` +
            `\nUnexpected calls:\n` +
            `- methodThatReturnsParam(3)\n` +
            `\nAll calls:\n` +
            `- methodThatReturnsParam(3)\n`

        )
    })
})

describe.skip('verifyMulti calledInOrder', () => {
    it('success if all methods are called in sequence', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('success if all methods are called in sequence no matter previous calls', () => {
        myClassMock.otherMethod(10)
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('success if all methods are called in sequence no matter next calls', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)
        myClassMock.otherMethod(10)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('success if all methods are called in order', () => {
        myClassMock.otherMethod(3)
        myClassMock.methodThatReturns1()
        myClassMock.otherMethod(5)
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturnsParam(10)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('success if all methods are called in order ignoring methods without matching args', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturnsParam(10)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(neq(3))
            .calledInOrder()
    })

    it('success if all methods are called in order no matter previous calls', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturns1()
        myClassMock.otherMethod(5)
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('success if all methods are called in order no matter next calls', () => {
        myClassMock.methodThatReturns1()
        myClassMock.otherMethod(5)
        myClassMock.methodThatReturnsParam(3)
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInOrder()
    })

    it('fails if no method to verify', () => {
        expect(() => {
            verifyMulti(myClassMock).calledInOrder()
        }).toThrow('Must specify at least one method or property to verify')
    })
})

describe.skip('verifyMulti calledInSequence', () => {
    it('success if all methods are called in sequence', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInSequence()
    })

    it('success if all methods are called in sequence no matter previous calls', () => {
        myClassMock.otherMethod(10)
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInSequence()
    })

    it('success if all methods are called in sequence no matter next calls', () => {
        myClassMock.methodThatReturns1()
        myClassMock.methodThatReturnsParam(3)
        myClassMock.otherMethod(10)

        verifyMulti(myClassMock)
            .methodThatReturns1()
            .methodThatReturnsParam(3)
            .calledInSequence()
    })

    it('fails if no method to verify', () => {
        expect(() => {
            verifyMulti(myClassMock).calledInSequence()
        }).toThrow('Must specify at least one method or property to verify')
    })
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    someProperty: string = 'Hello'

    methodThatReturns1(): number {
        return 1
    }

    methodThatReturnsParam(param: number): number {
        return param
    }

    otherMethod(param: number): number {
        return param
    }
}
