import { Spy } from '@/spy/Spy'

export function spy<T extends object>(instance: T): T {
    return new Spy(instance) as T
}
