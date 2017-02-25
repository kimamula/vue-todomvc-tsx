import Visibility from './models/Visibility'
import { http, Router, ServerThis } from 'director'

export function createClientRouter(handlerFactory: (visibility: Visibility) => Function): Router<{}> {
  return new Router(createRoutingTable(handlerFactory)).configure(handlerFactory)
}

export function createServerRouter(handlerFactory: (visibility: Visibility) => ((this: ServerThis) => any)): Router<ServerThis> {
  return new http.Router(createRoutingTable((visibility) => ({ get: handlerFactory(visibility) }))).configure(createConfigureOptions(handlerFactory))
}

function createRoutingTable<T>(handlerFactory: (visibility: Visibility) => T): { [path: string]: T } {
  return Object.keys(Visibility).reduce((acc, visibility: Visibility) => {
    acc[`/${visibility}`] = handlerFactory(visibility)
    return acc
  }, {})
}

function createConfigureOptions<This>(handlerFactory: (visibility: Visibility) => ((this: This) => any)) {
  return { notfound: handlerFactory('all') }
}
