import { Vue, Component } from 'vue-typed-for-tsx'
import { CreateElement } from 'vue'

const ENTER_KEY = 13

interface Props {
  todoReducer: {
    add: (title: string) => void
  }
}

@Component<Props>({ props: { todoReducer: null } })
export default class TodoEntry extends Vue<Props> {
  render(h: CreateElement) {
    return (
      <input
        class='new-todo'
        placeholder='What needs to be done?'
        onKeydown={(event: KeyboardEvent) => this.handleKeyDown(event)}
        autofocus={true}
      />
    )
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return
    }

    event.preventDefault()

    const input = event.currentTarget as HTMLInputElement,
      val = input.value.trim()

    if (val) {
      this.todoReducer.add(val)
      input.value = ''
    }
  }
}
