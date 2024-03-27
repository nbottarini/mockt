import { mockt } from '../src/mockt'
import { when } from '../src/when'

describe('classes', () => {
    it('mock', () => {
        const myClassMock = mockt(MyClass)
        when(myClassMock).funcReturn1(1, 'value').returns(2)

        const actual = myClassMock.funcReturn1(1, 'value')

        expect(actual).toBe(2)
    })
})

class MyClass {
    funcReturn1(a: number, b: string) {
        return 1
    }
}
