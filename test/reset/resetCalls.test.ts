import { mockt } from '../../src/mockt'
import { verifyOnce, when } from '../../src'
import { resetCalls } from '../../src/resetCalls'

it('reset multiple returns', () => {
    when(myClassMock).method().returns(5, 6)
    myClassMock.method()

    resetCalls(myClassMock)
    const actual = myClassMock.method()

    expect(actual).toEqual(5)
})

it('reset calls', () => {
    myClassMock.method()

    resetCalls(myClassMock)
    myClassMock.method()

    verifyOnce(myClassMock).method()
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
