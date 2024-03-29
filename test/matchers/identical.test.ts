import { when } from '@/when'
import { mockt } from '../../src'
import { is } from '@/matchers/IdenticalMatcher'

it('matches when value is same reference', () => {
    const someObj = {}
    when(myClassMock).methodWithObjParam(is(someObj)).returns({ name: 'Alice' })

    const actual = myClassMock.methodWithObjParam(someObj)

    expect(actual).toEqual({ name: 'Alice' })
})

it('matches when value is strict equal', () => {
    when(myClassMock).methodWithAnyParam(is('1')).returns({ name: 'Alice' })

    const actual = myClassMock.methodWithAnyParam('1')

    expect(actual).toEqual({ name: 'Alice' })
})

it('doesn\'t match when value is not same reference', () => {
    const someObj = {}
    when(myClassMock).methodWithObjParam(is(someObj)).returns({ name: 'Alice' })

    const actual = myClassMock.methodWithObjParam({})

    expect(actual).toBe(undefined)
})

it('doesn\'t match when value is not strict equal', () => {
    when(myClassMock).methodWithAnyParam(is('1')).returns({ name: 'Alice' })

    const actual = myClassMock.methodWithAnyParam(1)

    expect(actual).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    methodWithAnyParam(param: any): any {
        return param
    }

    methodWithObjParam(param: object): object {
        return param
    }
}
