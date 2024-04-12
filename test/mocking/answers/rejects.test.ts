import { mockt, when } from '../../../src'

it('rejects with given error', async () => {
    when(myClassMock).method().rejects(new Error('Some error'))

    await expect(async () => myClassMock.method()).rejects.toThrow('Some error')
})

it('rejects some error when no error is specified', async () => {
    when(myClassMock).method().rejects()

    await expect(async () => myClassMock.method()).rejects.toThrow(Error)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    async method(): Promise<number> {
        return Promise.resolve(1)
    }
}
