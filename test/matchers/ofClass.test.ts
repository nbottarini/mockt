import { when } from '@/when'
import { mockt, ofClass } from '../../src'

it('matches when value is an instance of expected class', () => {
    when(myClassMock).method(ofClass(OtherClass)).returns(5)

    const actual = myClassMock.method(new OtherClass())

    expect(actual).toEqual(5)
})

it('matches when value is an instance of expected parent class', () => {
    when(myClassMock).method(ofClass(ParentClass)).returns(5)

    const actual = myClassMock.method(new OtherClass())

    expect(actual).toEqual(5)
})

it('doesn\'t matches when value is not an instance of expected class', () => {
    when(myClassMock).method(ofClass(OtherClass)).returns(5)

    const actual = myClassMock.method(new MyClass())

    expect(actual).toBe(undefined)
})

beforeEach(() => {
    myClassMock = mockt(MyClass)
})

let myClassMock: MyClass

class MyClass {
    method(param: any): any {
        return param
    }
}

abstract class ParentClass {
    parentMethod(param: number): number {
        return param
    }
}

class OtherClass extends ParentClass {
    otherMethod(param: number): number {
        return param
    }
}
