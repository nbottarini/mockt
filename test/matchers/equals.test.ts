import { eq } from '../../src/matchers/EqualsMatcher'
import { any } from '../../src/matchers/AnyMatcher'
import { mockt } from '../../src/mockt'
import { when } from '../../src/when'

describe('numbers', () => {
    it('matches when equal', () => {
        when(myClassMock).methodWithNumberParam(eq(2)).returns(3)

        const actual = myClassMock.methodWithNumberParam(2)

        expect(actual).toEqual(3)
    })

    it('doesn\'t match when different', () => {
        when(myClassMock).methodWithNumberParam(eq(3)).returns(3)

        const actual = myClassMock.methodWithNumberParam(2)

        expect(actual).toBe(undefined)
    })
})

describe('strings', () => {
    it('matches when equal', () => {
        when(myClassMock).methodWithStringParam(eq('hello')).returns('bye')

        const actual = myClassMock.methodWithStringParam('hello')

        expect(actual).toEqual('bye')
    })

    it('doesn\'t match when different', () => {
        when(myClassMock).methodWithStringParam(eq('hello')).returns('bye')

        const actual = myClassMock.methodWithStringParam('other')

        expect(actual).toBe(undefined)
    })
})

describe('arrays', () => {
    it('matches when equal', () => {
        when(myClassMock).methodWithArrayParam(eq([1, 2, 3])).returns([1])

        const actual = myClassMock.methodWithArrayParam([1, 2, 3])

        expect(actual).toEqual([1])
    })

    it('doesn\'t match when different', () => {
        when(myClassMock).methodWithArrayParam(eq([1, 2, 3])).returns([1])

        const actual = myClassMock.methodWithArrayParam([1, 2])

        expect(actual).toBe(undefined)
    })
})

describe('objects', () => {
    it('matches when equal', () => {
        when(myClassMock).methodWithAnyParam(eq({ name: 'Bob' })).returns({ name: 'Alice' })

        const actual = myClassMock.methodWithAnyParam({ name: 'Bob' })

        expect(actual).toEqual({ name: 'Alice' })
    })

    it('doesn\'t match when different', () => {
        when(myClassMock).methodWithAnyParam(eq({ name: 'Bob' })).returns({ name: 'Alice' })

        const actual = myClassMock.methodWithAnyParam({ name: 'Charlie' })

        expect(actual).toBe(undefined)
    })
})

describe('nested matchers', () => {
    it('on arrays', () => {
        when(myClassMock).methodWithArrayParam(eq([1, any(), 3])).returns([1])

        const actual = myClassMock.methodWithArrayParam([1, 5, 3])

        expect(actual).toEqual([1])
    })

    it('on objects', () => {
        when(myClassMock).methodWithAnyParam(eq({ name: 'Bob', lastname: any() })).returns({ name: 'Alice' })

        const actual = myClassMock.methodWithAnyParam({ name: 'Bob', lastname: 'Wilson' })

        expect(actual).toEqual({ name: 'Alice' })
    })
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodWithAnyParam(param: any): any {
        return param
    }

    methodWithNumberParam(param: number): number {
        return param
    }

    methodWithStringParam(param: string): string {
        return param
    }

    methodWithArrayParam(param: number[]): number[] {
        return param
    }
}
