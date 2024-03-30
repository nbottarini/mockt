import { when } from '@/when'
import { mockt } from '../../src'

it('resolves specified promise', async () => {
    when(myClassMock).method().resolves(5)

    const actual = await myClassMock.method()

    expect(actual).toEqual(5)
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
