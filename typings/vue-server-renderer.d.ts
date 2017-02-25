import * as Vue from 'vue'

declare module 'vue-server-renderer' {
  function createRenderer(): Renderer
  interface Renderer {
    renderToString(app: Vue, callback: (err: any, html: string) => any): void
  }
}
