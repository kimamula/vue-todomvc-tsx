import * as nodeHTTP from 'http'
import { createServerRouter } from './router'
import Visibility from './models/Visibility'
import { createRenderer } from 'vue-server-renderer'
import TodoApp from './components/TodoApp'
import { Vue } from 'vue-typed-for-tsx'
import * as url from 'url'
import * as fs from 'fs'
import * as path from 'path'
import { CreateElement } from 'vue'

const renderer = createRenderer()
const router = createServerRouter((visibility: Visibility) => function() {
  renderer.renderToString(new Vue({
    render: (h: CreateElement) => (
      <html lang='en' data-framework='vue'>
      <head>
        <meta charset='utf-8' />
        <title>vue-typed-for-tsx • TodoMVC</title>
        <link rel='stylesheet' href='/static/todomvc-common.css' />
        <link rel='stylesheet' href='/static/todomvc-app-css.css' />
      </head>
      <body>
      <TodoApp initialTodos={[]} initialVisibility={visibility} />
      <footer class='info'>
        <p>Double-click to edit a todo</p>
      </footer>
      <script src='/static/todomvc-common.js'></script>
      <script src='/static/director.min.js'></script>
      <script src='/static/bundle.js'></script>
      </body>
      </html>
    )
  }), (err, html) => {
    err && console.error(err)
    this.res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/html' })
    this.res.end(`<!DOCTYPE html>${html}`)
  })
})
const CONTENT_TYPE_MAP = {
  '.css': 'text/css',
  '.js': 'text/javascript'
}

const server = nodeHTTP.createServer((req, res) => {
  const parsedUrl = url.parse(req.url)
  if (parsedUrl.pathname.indexOf('/static/') === 0) {
    const pathName = `.${parsedUrl.pathname}`
    return fs.readFile(pathName, (err, data) => {
      err && console.error(err)
      res.writeHead(err ? 404 : 200, { 'Content-Type': CONTENT_TYPE_MAP[path.parse(pathName).ext] || 'text/plain' })
      res.end(data)
    })
  }
  router.dispatch(req, res, (err) => {
    if (err) {
      console.error(err)
      res.writeHead(500)
      res.end()
    }
  })
})

server.listen(3000, () => console.log('Listening on port 3000'))
