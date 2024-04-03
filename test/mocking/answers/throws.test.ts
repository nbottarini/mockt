import { mockt, when } from '../../../src'

it('throws specified error when called', () => {
    when(myClassMock).method().throws(new Error('Some error'))

    expect(() => myClassMock.method()).toThrow('Some error')
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
