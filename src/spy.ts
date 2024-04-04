import { Spy } from '@/spy/Spy'

export function spy<T extends object>(instance: T): T {
    const spy = new Spy(instance)
    return spy.instance
}
