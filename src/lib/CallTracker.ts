import { MethodCall } from '@/callVerification/MethodCall'
import { Matcher } from '@/matchers/Matcher'

export class CallTracker {
    private methodCalls: MethodCall[] = []

    add(methodCall: MethodCall): void {
        this.methodCalls.push(methodCall)
    }

    getMatchingCalls(methodName: string, matchers: Matcher<any>[]): MethodCall[] {
        return this.methodCalls.filter(call => call.name === methodName && call.matches(matchers))
    }

    getMethodCalls(methodName: string): MethodCall[] {
        return this.methodCalls.filter(call => call.name === methodName)
    }

    getAllCalls(): MethodCall[] {
        return this.methodCalls
    }

    reset() {
        this.methodCalls = []
    }
}
