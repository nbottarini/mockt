import { Mocker } from '@/Mocker'

export function resetCalls(...instances: any) {
    instances.forEach(instance => {
        const mocker = (instance as any).__mocktMocker as Mocker
        mocker.resetCalls()
    })
}
