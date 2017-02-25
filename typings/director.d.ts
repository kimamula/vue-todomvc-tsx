import * as http from 'http'

declare module 'director' {
  interface Router<This> {
    init(): void
    on(path: string, f: (this: This) => any): void
    configure(options: ConfigureOptions<This>): this
    dispatch(req: http.IncomingMessage, res: http.ServerResponse, callback: (err?: any) => any): void
  }
  const Router: {
    new(routingTable?: { [key: string]: Function }): Router<{}>
    (routingTable?: { [key: string]: Function }): Router<{}>
  }
  interface ServerThis {
    req: http.IncomingMessage
    res: http.ServerResponse
  }
  namespace Methods {
    type RFC2616 = 'get' | 'post' | 'put' | 'delete' | 'trace' | 'connect' | 'options'
    type RFC2518 = 'propfind' | 'proppatch' | 'mkcol' | 'copy' | 'move' | 'lock' | 'unlock'
    type RFC3253 = 'version-control' | 'report' | 'checkout' | 'checkin' | 'uncheckout' | 'mkworkspace' | 'update' | 'label' | 'merge' | 'baseline-control' | 'mkactivity'
    type RFC3648 = 'orderpatch'
    type RFC3744 = 'acl'
    type RFC5323 = 'search'
    type RFC5789 = 'patch'
  }
  type Methods = Methods.RFC2616 | Methods.RFC2518 | Methods.RFC3253 | Methods.RFC3648 | Methods.RFC3744 | Methods.RFC5323 | Methods.RFC5789
  const http: {
    Router: { new(routingTable?: { [key: string]: {
      [method in Methods]?: (this: ServerThis) => any
    } }): Router<ServerThis> }
  }
  interface ConfigureOptions<This> {
    recurse?: 'forward' | 'backward' | false
    strict?: boolean
    async?: boolean
    delimiter?: string
    notfound?: (this: This) => any
    on?: ((this: This) => any) | ((this: This) => any)[]
    before?: ((this: This) => any) | ((this: This) => any)[]
  }
}
