import { when } from '@/when'
import { mockt } from '../../src'

it('rejects specified promise', async () => {
    when(myClassMock).method().rejects(new Error('Some error'))

    await expect(async () => myClassMock.method()).rejects.toThrow('Some error')
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
