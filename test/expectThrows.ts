export async function expectThrows(funcOrPromise: (() => void)|Promise<any>, ErrorClass) {
    let promise: any = funcOrPromise
    if (funcOrPromise instanceof Function) {
        promise = funcOrPromise()
    }
    await expect(promise).rejects.toThrowError(ErrorClass)
}
