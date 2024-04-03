import { mockt } from '@/mockt'
import { when } from '@/when'
import { neq } from '@/matchers/NotMatcher'

describe('numbers', () => {
    it('matches when different', () => {
        when(myClassMock).methodWithNumberParam(neq(2)).returns(3)

        const actual = myClassMock.methodWithNumberParam(2)

        expect(actual).toBe(undefined)
    })

    it('doesn\'t match when equals', () => {
        when(myClassMock).methodWithNumberParam(neq(3)).returns(3)

        const actual = myClassMock.methodWithNumberParam(2)

        expect(actual).toEqual(3)
    })
})

describe('strings', () => {
    it('matches when different', () => {
        when(myClassMock).methodWithStringParam(neq('hello')).returns('bye')

        const actual = myClassMock.methodWithStringParam('hello')

        expect(actual).toBe(undefined)
    })

    it('doesn\'t match when equal', () => {
        when(myClassMock).methodWithStringParam(neq('hello')).returns('bye')

        const actual = myClassMock.methodWithStringParam('other')

        expect(actual).toEqual('bye')
    })
})

describe('arrays', () => {
    it('matches when different', () => {
        when(myClassMock).methodWithArrayParam(neq([1, 2, 3])).returns([1])

        const actual = myClassMock.methodWithArrayParam([1, 2, 3])

        expect(actual).toBe(undefined)
    })

    it('doesn\'t match when equal', () => {
        when(myClassMock).methodWithArrayParam(neq([1, 2, 3])).returns([1])

        const actual = myClassMock.methodWithArrayParam([1, 2])

        expect(actual).toEqual([1])
    })
})

describe('objects', () => {
    it('matches when different', () => {
        when(myClassMock).methodWithAnyParam(neq({ name: 'Bob' })).returns({ name: 'Alice' })

        const actual = myClassMock.methodWithAnyParam({ name: 'Bob' })

        expect(actual).toBe(undefined)
    })

    it('doesn\'t match when equal', () => {
        when(myClassMock).methodWithAnyParam(neq({ name: 'Bob' })).returns({ name: 'Alice' })

        const actual = myClassMock.methodWithAnyParam({ name: 'Charlie' })

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
