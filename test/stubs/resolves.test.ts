import { when } from '@/when'
import { mockt } from '../../src'

it('resolves specified promise', async () => {
    when(myClassMock).method().resolves(5)

    const actual = await myClassMock.method()

    expect(actual).toEqual(5)
})

it('resolves multiple values', async () => {
    when(myClassMock).method().resolves(5, 6)

    const actual1 = await myClassMock.method()
    const actual2 = await myClassMock.method()

    expect(actual1).toEqual(5)
    expect(actual2).toEqual(6)
})

it('resolves last value when all values are consumed', async () => {
    when(myClassMock).method().resolves(5, 6)

    await myClassMock.method()
    await myClassMock.method()
    const actual = await myClassMock.method()

    expect(actual).toEqual(6)
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
