import Todo from '../models/Todo'

const STORAGE_KEY = 'todos-vuejs'

export function fetch(): Todo[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}
export function store(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
