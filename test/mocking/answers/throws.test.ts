import { mockt, when } from '../../../src'

it('throws specified error when called', () => {
    when(myClassMock).method().throws(new Error('Some error'))

    expect(() => myClassMock.method()).toThrow('Some error')
})

it('throws some error when no error is given', () => {
    when(myClassMock).method().throws()

    expect(() => myClassMock.method()).toThrow(Error)
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
