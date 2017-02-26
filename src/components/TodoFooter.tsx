import { Vue, Component } from 'vue-typed-for-tsx'
import Visibility from '../models/Visibility'
import { pluralize } from '../utils'
import { CreateElement } from 'vue'

interface Props {
  allCount: number
  activeCount: number
  visibility: Visibility
  todoReducer: {
    clearCompleted: () => void
  }
}

@Component<Props>({ props: { allCount: null, activeCount: null, visibility: null, todoReducer: null }})
export default class TodoFooter extends Vue<Props> {
  render(h: CreateElement) {
    if (this.allCount === 0) {
      return null
    }

    return (
      <footer class='footer'>
        <span class='todo-count'>
          <strong>{this.activeCount}</strong> {pluralize(this.activeCount, 'item')} left
        </span>
        <ul class='filters'>
          {Object.keys(Visibility).map(visibility =>
            <li>
              <a href={`#/${visibility}`}
                 class={{ selected: visibility === this.visibility }}>
                {Visibility[visibility]}
              </a>
            </li>
          )}
        </ul>
        { this.allCount === this.activeCount
          ? null
          : <button
            class='clear-completed'
            onClick={() => this.todoReducer.clearCompleted()}>
            Clear completed
          </button>
        }
      </footer>
    )
  }
}
