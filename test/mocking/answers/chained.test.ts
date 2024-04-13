import { mockt, when } from '../../../src'

it('chained stubbing', () => {
    when(myClassMock).method()
        .returns(5)
        .returns(6)
        .calls(() => 7)
        .throws(new Error('Some error'))

    const actual1 = myClassMock.method()
    const actual2 = myClassMock.method()
    const actual3 = myClassMock.method()

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(6)
    expect(actual3).toEqual(7)
    expect(() => myClassMock.method()).toThrow('Some error')
})

it('new stub overrides previous chain', () => {
    when(myClassMock).method()
        .returns(5)
        .returns(6)
        .calls(() => 7)
        .throws(new Error('Some error'))
    when(myClassMock).method().returns(3)

    const actual1 = myClassMock.method()
    const actual2 = myClassMock.method()
    const actual3 = myClassMock.method()
    const actual4 = myClassMock.method()

    expect(actual1).toEqual(3)
    expect(actual2).toEqual(3)
    expect(actual3).toEqual(3)
    expect(actual4).toEqual(3)
})

it('chain with errors don\'t affect next answers', () => {
    when(myClassMock).method()
        .throws(new Error('Some error'))
        .returns(6)

    expect(() => myClassMock.method()).toThrow('Some error')
    expect(myClassMock.method()).toEqual(6)
})

it('chain with rejections don\'t affect next answers', async () => {
    when(myClassMock).method()
        .rejects(new Error('Some error'))
        .resolves(6)

    await expect(myClassMock.method()).rejects.toThrow('Some error')
    await expect(myClassMock.method()).resolves.toEqual(6)
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
