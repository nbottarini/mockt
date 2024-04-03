import { mockt } from '@/mockt'
import { when } from '@/when'

describe('mocking property', () => {
    describe('without getter', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = myClassMock.simpleProperty

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).simpleProperty.returns('bye')

            const actual = myClassMock.simpleProperty

            expect(actual).toBe('bye')
        })
    })

    describe('with getter', () => {
        it('when not-stubbed returns undefined', () => {
            const actual = myClassMock.propertyWithGetter

            expect(actual).toBe(undefined)
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).propertyWithGetter.returns('bye')

            const actual = myClassMock.propertyWithGetter

            expect(actual).toBe('bye')
        })
    })

    describe('function property', () => {
        it('when not-stubbed throws TypeError', () => {
            expect(() =>  myClassMock.functionProperty()).toThrow(TypeError)
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).functionProperty().returns(2)

            const actual = myClassMock.functionProperty()

            expect(actual).toBe(2)
        })
    })

    describe('lambda property', () => {
        it('when not-stubbed throws TypeError', () => {
            expect(() =>  myClassMock.lambdaProperty(2)).toThrow(TypeError)
        })

        it('when stubbed returns configured value', () => {
            when(myClassMock).lambdaProperty(1).returns(2)

            const actual = myClassMock.lambdaProperty(1)

            expect(actual).toBe(2)
        })
    })

    describe('inherited', () => {
        it('with getter when stubbed returns configured value', () => {
            when(myClassMock).inheritedPropertyWithGetter.returns('bye')

            const actual = myClassMock.inheritedPropertyWithGetter

            expect(actual).toBe('bye')
        })
    })

    beforeEach(() => {
        myClassMock = mockt(MyClass)
    })
})

let myClassMock: MyClass

abstract class ParentClass {
    get inheritedPropertyWithGetter(): string {
        return 'hello'
    }
}

class MyClass extends ParentClass {
    simpleProperty: string = 'hello'
    uninitializedProperty: string
    functionProperty: Function
    lambdaProperty: (a: number) => number

    constructor() {
        super()
        this.uninitializedProperty = 'hello'
        this.functionProperty = () => 'hello'
        this.lambdaProperty = a => a
    }

    get propertyWithGetter(): string {
        return 'hello'
    }
}
