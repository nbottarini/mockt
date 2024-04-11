export class UnknownResponse extends Function {
    constructor() {
        super()
        const proxy = new Proxy(this, {
            apply(target: UnknownResponse, thisArg: any, argArray: any[]): UnknownResponse {
                return proxy
            }
        })
        return proxy
    }
}
