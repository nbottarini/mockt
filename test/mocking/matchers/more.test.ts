import { when } from '@/when'
import { mockt, more } from '../../../src'

it('matches when value is greater than given value', () => {
    when(myClassMock).method(more(10)).returns(5)

    const actual1 = myClassMock.method(11)
    const actual2 = myClassMock.method(15)

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(5)
})

it('matches when value is equal to given value', () => {
    when(myClassMock).method(more(10)).returns(5)

    const actual = myClassMock.method(10)

    expect(actual).toEqual(5)
})

it('doesn\'t matches when value is less than given value', () => {
    when(myClassMock).method(more(10)).returns(5)

    const actual = myClassMock.method(9)

    expect(actual).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(param: number): number {
        return param
    }
}
