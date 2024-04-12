import { Mocker } from '@/Mocker'

export function reset(...instances: any) {
    instances.forEach(instance => {
        const mocker = (instance as any).__mocktMocker as Mocker
        if (!mocker) throw new Error('Given instance is not a mock')
        mocker.reset()
    })
}
