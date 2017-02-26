import TodoEntry from './TodoEntry'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { Vue, Component } from 'vue-typed-for-tsx'
import TodoReducer from '../reducers/TodoReducer'
import Visibility from '../models/Visibility'
import { createClientRouter } from '../router'
import { CreateElement } from 'vue'
import Todo from '../models/Todo'
import { store } from '../repositories/TodoRepository'

interface Props {
  initialTodos: Todo[]
  initialVisibility: Visibility
}
interface Data {
  visibility: Visibility
  todos: Todo[]
}

@Component<Props, Data>({
  props: { initialTodos: null, initialVisibility: null },
  data: function() {
    return {
      visibility: this.initialVisibility,
      todos: this.initialTodos
    }
  }
})
export default class TodoApp extends Vue<Props, Data> {
  todoReducer: TodoReducer

  get activeCount(): number {
    return this.todos.filter(todo => !todo.completed).length
  }

  get allCount(): number {
    return this.todos.length
  }

  beforeMount() {
    this.todoReducer = new TodoReducer((reduce) => {
      this.todos = reduce(this.todos)
      store(this.todos)
    })
  }

  render(h: CreateElement) {
    return (
      <div class='todoapp' data-visibility={this.visibility}>
        <header class='header'>
          <h1>todos</h1>
          <TodoEntry todoReducer={this.todoReducer} />
        </header>
        <TodoList todoReducer={this.todoReducer} visibility={this.visibility} activeCount={this.activeCount} todos={this.todos} />
        <TodoFooter todoReducer={this.todoReducer} visibility={this.visibility} activeCount={this.activeCount} allCount={this.allCount} />
      </div>
    )
  }

  mounted(): void {
    createClientRouter((visibility: Visibility) => () => this.visibility = visibility).init()
  }
}
