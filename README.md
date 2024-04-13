<p align="center">
  <img alt="Mockt" src="docs/logo_readme.png" width="80%">
</p>

<!-- A spacer -->
<p>&nbsp;</p>

<h2 align="center">Joyful mocking library for Typescript and Javascript</h2>

[![npm](https://img.shields.io/npm/v/mockt.svg)](https://www.npmjs.com/package/mockt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/mockt/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/mockt/actions)

## Getting Started

**Npm**:
```
$ npm install --save-dev mockt
```

**Yarn**:
```
$ yarn add -D mockt
```

Now let's write a simple test:

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, any()).returns(3)

const actual = calculator.sum(2, 8)

expect(actual).toEqual(3)
verify(calculator).sum(any(), 8)
```

## Features
- Typescript Support and IDE Autocompletion
- Class mocks
- Abstract class mocks
- Interface mocks
- Generics support
- Flexible stubbing with multiple returns, custom function call, errors, promises and stub overriding.
- Properties stubbing
- Spy on real objects
- Argument Capturing
- Verification atLeast, atMost, once, times(n)
- Verification called and never called
- Properties read and write verification
- Verification order
- Argument Matchers for stubs and verifications
- Reset mock stubs
- Reset mock recorded calls

## Table of Contents
 
- [Usage](#usage)
  - [Class mocks](#class-mocks)
    - [Arrow methods](#arrow-methods)
  - [Abstract Class mocks](#abstract-class-mocks)
  - [Interface mocks](#interface-mocks)
  - [Generics](#generics)
  - [Properties](#properties)
    - [Getters](#getters)
  - [Stubbing](#stubbing)
    - [Multiple returns](#multiple-returns)
    - [Function call](#function-call)
    - [Throw error](#throw-error)
    - [Promise resolve](#promise-resolve)
    - [Promise reject](#promise-reject)
    - [Chained answers](#chained-answers)
  - [Matchers](#matchers)
    - [Equals](#equals)
      - [Deep equality and type conversion](#deep-equality-and-type-conversion)
    - [Not Equals](#not-equals)
    - [Identical](#identical)
    - [Any](#any)
    - [Any Number](#any-number)
    - [Any String](#any-string)
    - [Any Array](#any-array)
    - [Any Object](#any-object)
    - [Any Function](#any-function)
    - [IsNull](#isnull)
    - [IsNil](#isnil)
    - [NotNull](#notnull)
    - [NotNil](#notnil)
    - [Less](#less)
    - [More](#more)
    - [Range](#range)
    - [OfClass](#ofclass)
    - [Nested matchers](#nested-matchers)
    - [Not](#not)
    - [And](#and)
    - [Or](#or)
  - [Verification](#verification)
    - [Verify method called](#verify-method-called)
    - [Verify property read](#verify-property-read)
    - [Verify property set](#verify-property-set)
    - [Verify method called at least n times](#verify-method-called-at-least-n-times)
    - [Verify method called at most n times](#verify-method-called-at-most-n-times)
    - [Verify method called exactly n times](#verify-method-called-exactly-n-times)
    - [Verify method never called](#verify-method-never-called)
    - [Verify multiple method calls](#verify-multiple-method-calls)
    - [Verify multiple methods never called](#verify-multiple-methods-never-called)
    - [Verify multiple methods called in expected order](#verify-multiple-methods-called-in-expected-order)
  - [Capture arguments](#capture-arguments)
    - [Last call](#last-call)
    - [First call](#first-call)
    - [All calls](#all-calls)
    - [Setters](#setters)
  - [Spies](#spies)
  - [Reset](#reset)
    - [Calls](#calls)
    - [All](#all)

## Usage

### Class mocks

```typescript
class Calculator {
    sum(a: number, b: number): number {
        return a + b
    }
}

const calculator = mockt(Calculator)
when(calculator).sum(2, 3).returns(5)

calculator.sum(2, 3) // returns 5
```

#### Arrow methods

```typescript
class Calculator {
    sum = (a: number, b: number) => a + b
}

const calculator = mockt(Calculator)
when(calculator).sum(2, 3).returns(5)

calculator.sum(2, 3) // returns 5
```

**Note**: arrow methods fails when called without stubbing them.

### Abstract Class mocks

```typescript
abstract class Calculator {
    abstract sum(a: number, b: number): number
}

const calculator = mockt(Calculator)
when(calculator).sum(2, 3).returns(5)

calculator.sum(2, 3) // returns 5
```

**Note**: abstract methods fails when called without stubbing them.

### Interface mocks

```typescript
interface Calculator {
    sum(a: number, b: number): number
}

const calculator = mockt<Calculator>()
when(calculator).sum(2, 3).returns(5)

calculator.sum(2, 3) // returns 5
```

**Note**: Interfaces are passed as Generic Parameter to mockt function. 

**Note**: Interface methods fails when called without stubbing them.

### Generics

```typescript
interface List<T> {
    add(item: T): void
    get(index: number): T
}

const list = mockt(List<string>)
when(list).get(3).returns('Item 3')

list.get(3) // returns 'Item 3'
```

### Properties

```typescript
class User {
    public name: string
}

const user = mockt(User)
when(user).name.returns('Alice')

user.name // returns 'Alice'
```

#### Getters

```typescript
class User {
    private _name: string
    
    get name(): string {
        return this._name
    }
}

const user = mockt(User)
when(user).name.returns('Alice')

user.name // returns 'Alice'
```

### Stubbing

#### Multiple returns

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, 3).returns(5, 6, 7)

calculator.sum(2, 3) // returns 5
calculator.sum(2, 3) // returns 6
calculator.sum(2, 3) // returns 7
calculator.sum(2, 3) // returns 7
```

#### Stub overriding

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, 3).returns(5)
when(calculator).sum(2, 3).returns(6)

calculator.sum(2, 3) // returns 6
calculator.sum(2, 3) // returns 6
```

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(any(), any()).returns(5, 6)
when(calculator).sum(2, 3).returns(7)

calculator.sum(2, 3) // returns 7
calculator.sum(2, 4) // returns 5
calculator.sum(2, 5) // returns 6
```

#### Function call

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(any(), any()).calls((a, b) => a * b)

calculator.sum(2, 3) // returns 6
calculator.sum(3, 4) // returns 12
```

#### Throw error

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(any(), any()).throws(new Error('Some error'))

calculator.sum(2, 3) // throws Error('Some error')
```

#### Promise resolve

```typescript
const apiClient = mockt(ApiClient)
when(apiClient).getUser().resolves(user1, user2)

await apiClient.getUser() // returns user 1
await apiClient.getUser() // returns user 2
```

#### Promise reject

```typescript
const apiClient = mockt(ApiClient)
when(apiClient).getUser().rejects(new Error('Some error'))

await apiClient.getUser() // throws Error('Some error')
```

#### Chained answers

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, 3)
        .returns(5)
        .returns(6)
        .calls(() => 7)
        .throws(new Error('Some error'))

calculator.sum(2, 3) // returns 5
calculator.sum(2, 3) // returns 6
calculator.sum(2, 3) // returns 7
calculator.sum(2, 3) // throws Error('Some error')
```

### Matchers

#### Equals

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, eq(3)).returns(5)

calculator.sum(2, 3) // returns 5
calculator.sum(2, 4) // returns undefined
```

**Note**: When a value is given instead of a matcher, the equals matcher is used.
**Note**: Performs deep equality

##### Deep equality and type conversion

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(eq({ user: { age: '17' } })).returns(100)

billingService.calculateFor({ user: { age: 17 } }) // returns 100
```

#### Not Equals

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, neq(3)).returns(5)

calculator.sum(2, 6) // returns 5
calculator.sum(2, 3) // returns undefined
```

#### Identical

```typescript
const billingService = mockt(BillingService)
const alice = { name: 'Alice' }
when(billingService).calculateFor(is(alice)).returns(100)

billingService.calculateFor(alice) // returns 100
billingService.calculateFor({ name: 'Alice' }) // returns undefined
```

#### Any

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, any()).returns(5)

calculator.sum(2, 5) // returns 5
calculator.sum(2, 6) // returns 5
calculator.sum(3, 5) // returns undefined
```

#### Any Number

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(anyNumber(), any()).returns(5)

calculator.sum(1, 2) // returns 10
calculator.sum('1', 2) // returns undefined
calculator.sum(1, '2') // returns 10
```

#### Any String

```typescript
const splitter = mockt(StringSplitter)
when(splitter).split(anyString()).returns(['Hello', 'World'])

splitter.split('Hello World') // returns ['Hello', 'World']
splitter.split('Bye') // returns ['Hello', 'World']
splitter.split(3) // returns undefined
```

#### Any Array

```typescript
const calculator = mockt(Calculator)
when(calculator).average(anyArray()).returns(10)

calculator.average([1, 2]) // returns 10
calculator.average([3, 4]) // returns 10
calculator.average([]) // returns 10
calculator.average(3) // returns undefined
```

#### Any Object

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(anyObject()).returns(2000)

billingService.calculateFor({ name: 'Alice', lastname: 'Jones' }) // returns 2000
billingService.calculateFor({}) // returns 2000
billingService.calculateFor('alice') // returns undefined
```

#### Any Function

```typescript
const caller = mockt(FunctionCalled)
when(caller).call(anyFunction()).returns(10)

caller.call(() => {}) // returns 10
caller.call(function () {}) // returns 10
caller.call('alice') // returns undefined
```

#### IsNull

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(isNull()).throws(new Error('User cannot be null'))

billingService.calculateFor(null) // throws Error('User cannot be null')
billingService.calculateFor({ name: 'Alice' }) // Doesn't throw
billingService.calculateFor(undefined) // Doesn't throw
billingService.calculateFor('') // Doesn't throw
billingService.calculateFor([]) // Doesn't throw
```

#### IsNil

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(isNil()).throws(new Error('User cannot be null'))

billingService.calculateFor(null) // throws Error('User cannot be null')
billingService.calculateFor(undefined) // throws Error('User cannot be null')
billingService.calculateFor({ name: 'Alice' }) // Doesn't throw
billingService.calculateFor('') // Doesn't throw
billingService.calculateFor([]) // Doesn't throw
```

#### NotNull

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(notNull()).returns(5000)

billingService.calculateFor({ name: 'Alice' }) // returns 5000
billingService.calculateFor(undefined) // returns 5000
billingService.calculateFor(null) // returns undefined
```

#### NotNil

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(notNil()).returns(5000)

billingService.calculateFor({ name: 'Alice' }) // returns 5000
billingService.calculateFor(undefined) // returns undefined
billingService.calculateFor(null) // returns undefined
```

#### Less

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(less(5), any()).returns(10)

calculator.sum(4, 2) // returns 10
calculator.sum(5, 2) // returns 10
calculator.sum(6, 2) // returns undefined
```

#### More

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(more(5), any()).returns(10)

calculator.sum(6, 2) // returns 10
calculator.sum(5, 2) // returns 10
calculator.sum(4, 2) // returns undefined
```

#### Range

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(range(5, 10), any()).returns(10)

calculator.sum(4, 2) // returns undefined
calculator.sum(5, 2) // returns 10
calculator.sum(6, 2) // returns 10
calculator.sum(9, 2) // returns 10
calculator.sum(10, 2) // returns 10
calculator.sum(11, 2) // returns undefined
```

#### OfClass

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(ofClass(Employee)).returns(2000)

billingService.calculateFor(new Employee('Alice')) // returns 2000
billingService.calculateFor(new User('Alice')) // returns undefined
```

#### Nested matchers

```typescript
const billingService = mockt(BillingService)
when(billingService).calculateFor(eq({ name: 'Alice', lastname: any() })).returns(2000)

billingService.calculateFor({ name: 'Alice', lastname: 'Jones' }) // returns 2000
```

```typescript
const calculator = mockt(Calculator)
when(calculator).average(eq([1, any(), 3])).returns(1)

calculator.average([1, 2, 3]) // returns 1
```

#### Not

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(not(anyNumber()), any()).returns(10)

calculator.sum('5', 2) // returns 10
calculator.sum(5, 2) // returns undefined
```

#### And

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(and(neq(2), neq(3)), any()).returns(10)

calculator.sum(1, 2) // returns 10
calculator.sum(2, 2) // returns undefined
calculator.sum(3, 2) // returns undefined
```

#### Or

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(or(2, 3), any()).returns(10)

calculator.sum(2, 2) // returns 10
calculator.sum(3, 2) // returns 10
calculator.sum(1, 2) // returns undefined
```

### Verification

#### Verify method called

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)

verify(calculator).sum(1, 2) // passes
verify(calculator).sum(any(), 2) // passes
verify(calculator).sum(2, 2) // fails
```

#### Verify property read

```typescript
const user = mockt(User)

const name = user.name

verify(user).getProperty('name') // passes
verify(user).getProperty('lastname') // fails
```

#### Verify property set

```typescript
const user = mockt(User)

user.name = 'Alice'

verify(user).setProperty('name', 'Alice') // passes
verify(user).setProperty('name', any()) // passes
verify(user).setProperty('name', 'Bob') // fails
```

#### Verify method called at least n times

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(3, 4)
calculator.sum(5, 6)

verifyAtLeast(2, calculator).sum(any(), any()) // passes
verifyAtLeast(3, calculator).sum(any(), any()) // passes
verifyAtLeast(4, calculator).sum(any(), any()) // fails
```

#### Verify method called at most n times

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyAtMost(4, calculator).sum(1, any()) // passes
verifyAtMost(3, calculator).sum(1, any()) // passes
verifyAtMost(2, calculator).sum(1, any()) // fails
```

#### Verify method called exactly n times

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyTimes(3, calculator).sum(1, any()) // passes
verifyTimes(2, calculator).sum(1, any()) // fails
```

#### Verify method never called

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyNever(calculator).sum(1, 1) // passes
verifyNever(calculator).sum(1, 2) // fails
```

#### Verify multiple method calls

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyMulti(calculator)
    .sum(1, 2)
    .sum(1, 4)
    .called() // passes
```

#### Verify multiple methods never called

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyMulti(calculator)
    .sum(2, 2)
    .sum(2, 4)
    .never() // passes
```

#### Verify multiple methods called in expected order

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyMulti(calculator)
    .sum(1, 2)
    .sum(1, 4)
    .calledInOrder() // passes
```

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)
calculator.sum(1, 4)

verifyMulti(calculator)
    .sum(1, 4)
    .sum(1, 2)
    .calledInOrder() // fails
```

### Capture arguments

#### Last call

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)

const [first, second] = capture(calculator).sum // returns [1, 3]
```

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)

const [first, second] = captureLast(calculator).sum // returns [1, 3]
```

#### First call

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)

const [first, second] = captureFirst(calculator).sum // returns [1, 2]
```

#### All calls

```typescript
const calculator = mockt(Calculator)

calculator.sum(1, 2)
calculator.sum(1, 3)

const args = captureAll(calculator).sum // returns [[1, 2], [1, 3]]
```

#### Setters

```typescript
const user = mockt(User)

user.name = 'Alice'

const [name] = capture(user).setProperty('name') // returns 'Alice'
```

### Spies

```typescript
const calculator = new Calculator()
const calculatorSpy = spy(calculator)

calculator.sum(1, 2) // returns 3

verify(calculatorSpy).sum(1, 2) // passes
verify(calculatorSpy).sum(2, 2) // fails
```

### Reset

#### Calls

```typescript
const calculator = mockt(Calculator)
calculator.sum(1, 2) // returns undefined
verify(calculatorSpy).sum(1, 2) // passes

resetCalls(calculator)

verify(calculatorSpy).sum(1, 2) // fails
```

#### All

```typescript
const calculator = mockt(Calculator)
calculator.sum(1, 2) // returns undefined
verify(calculatorSpy).sum(1, 2) // passes

reset(calculator)

verify(calculatorSpy).sum(1, 2) // fails
```

```typescript
const calculator = mockt(Calculator)
when(calculator).sum(2, any()).returns(3)
reset(calculator)

calculator.sum(1, 2) // returns undefined
```

## Credits

Thanks to all the contributors of [ts-mockito](https://github.com/NagRock/ts-mockito) and [Mockk](https://mockk.io/).
