import TodoApp from './components/TodoApp'
import { Vue } from 'vue-typed-for-tsx'
import Visibility from './models/Visibility'
import { CreateElement } from 'vue'
import { fetch } from './repositories/TodoRepository'

const root = document.querySelector('.todoapp') as HTMLElement

new Vue({
  render: (h: CreateElement) =>
    <TodoApp initialVisibility={root.dataset.visibility as Visibility} initialTodos={fetch()} />
}).$mount(root)
