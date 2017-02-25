import { Vue, Component } from 'vue-typed-for-tsx'
import Todo from '../models/Todo'
import { CreateElement } from 'vue'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

export interface Props {
  todo: Todo
  todoReducer: {
    remove: (id: string) => void
    setTitle: (id: string, title: string) => void
    setCompleted: (id: string, completed: boolean) => void
  }
}

@Component<Props>({
  props: { todo: null, todoReducer: null },
  directives: {
    'todo-focus': (el, binding) => binding.value && el.focus(),
    'todo-checked': (el: HTMLInputElement, binding) => el.checked = binding.value
  }
})
export default class TodoItem extends Vue<Props> {
  editText = ''
  editing = false

  render(h: CreateElement) {
    return (
      <li class={{ completed: this.todo.completed, editing: this.editing, [`_${this.todo.id}`]: true }}>
        <div class='view'>
          <input
            class='toggle'
            type='checkbox'
            v-todo-checked={this.todo.completed}
            onChange={() => this.handleToggle()}
          />
          <label onDblclick={() => this.handleEdit()}>
            {this.todo.title}
          </label>
          <button class='destroy' onClick={() => this.handleDestroy()} />
        </div>
        <input
          class='edit'
          value={this.editText}
          onBlur={() => this.handleSubmit()}
          onChange={(event: Event) => this.handleChange(event)}
          onKeydown={(event: KeyboardEvent) => this.handleKeyDown(event)}
          v-todo-focus={this.editing}
        />
      </li>
    )
  }

  handleSubmit() {
    const val = this.editText.trim()
    if (val) {
      this.todoReducer.setTitle(this.todo.id, val)
      this.editText = val
    } else {
      this.handleDestroy()
    }
    this.editing = false
  }

  handleDestroy() {
    this.todoReducer.remove(this.todo.id)
    this.editing = false
  }

  handleEdit() {
    this.editing = true
    this.editText = this.todo.title
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.which === ESCAPE_KEY) {
      this.editText = this.todo.title
      this.editing = false
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit()
    }
  }

  handleChange(event: Event) {
    this.editText = (event.target as HTMLInputElement).value
  }

  handleToggle() {
    this.todoReducer.setCompleted(this.todo.id, !this.todo.completed)
  }
}
