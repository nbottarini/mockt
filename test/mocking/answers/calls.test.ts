import { any, mockt, when } from '../../../src'

it('returns result from specified function', () => {
    when(myClassMock).method(any()).calls(p => p * 2)

    const actual = myClassMock.method(7)

    expect(actual).toEqual(14)
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
