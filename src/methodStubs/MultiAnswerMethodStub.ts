import { MethodStub } from '@/methodStubs/MethodStub'
import { Matcher } from '@/matchers/Matcher'

export class MultiAnswerMethodStub<R> extends MethodStub<R> {
    private answers: MethodStub<R>[]
    private answerIndex = 0

    private constructor(name: string, matchers: Matcher<any>[], answer: MethodStub<R>) {
        super(name, matchers)
        this.answers = [answer]
    }

    execute(args: any[]): R {
        const currentIndex = this.answerIndex
        this.answerIndex = Math.min(this.answerIndex + 1, this.answers.length - 1)
        return this.answers[currentIndex].execute(args)
    }

    append(answer: MethodStub<R>) {
        this.answers.push(answer)
    }

    reset() {
        this.answerIndex = 0
    }

    static from<R>(answer: MethodStub<R>): MultiAnswerMethodStub<R> {
        return new MultiAnswerMethodStub(answer.name, answer.matchers, answer)
    }
}
