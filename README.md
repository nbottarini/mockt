[![npm](https://img.shields.io/npm/v/@nbottarini/mockt.svg)](https://www.npmjs.com/package/@nbottarini/mockt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/mockt/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/mockt/actions)

# Mockt
Mocking library for Typescript

## Installation

Npm:
```
$ npm install --save-dev mockt
```

Yarn:
```
$ yarn add -D mockt
```

## Simple Example

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
- Flexible stubbing with multiple returns, custom function call, errors and promises.
- Spy on real objects
- Argument Capturing
- Verification atLeast, atMost, once, times(n)
- Verification called and never called
- Properties read and write verification
- Verification order
- Argument Matchers for stubs and verifications
- Reset mock stubs
- Reset mock recorded calls

## Usage

