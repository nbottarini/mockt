export abstract class Matcher<T> {
    abstract matches(value: T): boolean
}
