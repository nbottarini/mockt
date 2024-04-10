import { MethodStub } from '@/methodStubs/MethodStub'

export class NullMethodStub<R> extends MethodStub<R> {
    constructor(name: string) {
        super(name, [])
    }

    matches(args: any[]): boolean {
        return true
    }

    execute(args: any[]): R {
        return undefined
    }
}
