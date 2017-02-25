import Todo from '../models/Todo'
import { uuid } from '../utils'

export default class TodoReducer {
  constructor(private subscriber: (reduce: (todos: Todo[]) => Todo[]) => any) {
  }
  add(title: string): void {
    this.subscriber(todos => [...todos, { id: uuid(), title, completed: false }])
  }
  remove(id: string): void {
    this.subscriber(todos => todos.filter(todo => todo.id !== id))
  }
  toggleAll(completed: boolean): void {
    this.subscriber(todos => todos.map(todo => ({ ...todo, completed })))
  }
  clearCompleted(): void {
    this.subscriber(todos => todos.filter(todo => !todo.completed))
  }
  setTitle(id: string, title: string): void {
    this.subscriber(todos => todos.map(todo => todo.id === id ? { ...todo, title } : todo))
  }
  setCompleted(id: string, completed: boolean): void {
    this.subscriber(todos => todos.map(todo => todo.id === id ? { ...todo, completed } : todo))
  }
}
