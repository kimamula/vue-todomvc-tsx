import { Vue, Component } from 'vue-typed-for-tsx'
import Todo from '../models/Todo'
import TodoItem from './TodoItem'
import Visibility from '../models/Visibility'
import { CreateElement } from 'vue'

export interface Props {
  activeCount: number
  visibility: Visibility
  todos: Todo[]
  todoReducer: {
    remove: (id: string) => void
    toggleAll: (checked: boolean) => void
    setTitle: (id: string, title: string) => void
    setCompleted: (id: string, completed: boolean) => void
  }
}

@Component<Props>({ props: { activeCount: null, visibility: null, todos: null, todoReducer: null } })
export default class TodoList extends Vue<Props> {
  render(h: CreateElement) {
    if (this.todos.length === 0) {
      return null
    }
    return (
      <section class='main'>
        <input
          class='toggle-all'
          type='checkbox'
          onChange={(event: Event) => this.todoReducer.toggleAll((event.target as HTMLInputElement).checked)}
          checked={this.activeCount === 0}
        />
        <ul class='todo-list'>
          {this.visibleTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              todoReducer={this.todoReducer}
            />
          )}
        </ul>
      </section>
    )
  }

  get visibleTodos(): Todo[] {
    return this.todos.filter(todo => {
      switch (this.visibility) {
        case 'active':
          return !todo.completed
        case 'completed':
          return todo.completed
        default:
          return true
      }
    })
  }
}
