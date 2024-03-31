import { Mocker } from './Mocker'

export function reset(...instances: any) {
    instances.forEach(instance => {
        const mocker = (instance as any).__mocktMocker as Mocker
        mocker.reset()
    })
}
