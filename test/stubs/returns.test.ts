import { when } from '@/when'
import { mockt } from '../../src'

it('returns specified value', () => {
    when(myClassMock).method().returns(5)

    const actual = myClassMock.method()

    expect(actual).toEqual(5)
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
