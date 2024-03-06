import { Check, Trash } from 'lucide-react'
import { Todo } from '../models/Todo'
import { useState } from 'react'

const TodoItem = ({
  todo,
  toggle,
  remove,
}: {
  todo: Todo
  toggle: (id: string) => void
  remove: (id: string) => void
  //   removedelay: (id: string) => void
}) => {
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  const handleToggle = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }

    toggle(todo.id!)

    const id = setTimeout(() => {
      if (todo.isCompleted) return
      remove(todo.id!) // Remove the todo after 4 seconds
      setTimeoutId(null)
    }, 4000)
    setTimeoutId(id)
  }
  return (
    <div
      className={`border bg-neu tral-800 mt-4 rounded-2xl p-4 border-neutral-500 flex items-center ${
        todo.isCompleted ? 'opacity-30' : 'placeholder-opacity-100'
      }`}
      key={todo.id}
    >
      <input
        className="sr-only peer"
        type="checkbox"
        id={todo.id}
        onChange={() => {
          toggle(todo.id!)
          handleToggle()
          //   removedelay(todo.id!)
        }}
        checked={todo.isCompleted}
      />
      <label
        htmlFor={todo.id}
        className="text-lg ml-2 font-semibold text-neutral-800 flex items-center cursor-pointer"
      >
        <span
          className={`rounded-full border-2 w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
            todo.isCompleted
              ? 'bg-green-500 border-green-500'
              : 'bg-transparent border-red-500'
          }`}
        >
          {todo.isCompleted && <Check className="h-3 w-3 text-white" />}
        </span>
        <span className="ml-3 dark:text-neutral-200">{todo.task}</span>
        <div className="ml-3 flex">
          <p className="text-sm dark:text-neutral-200">{todo.category}</p>
        </div>
      </label>
      <button className="ml-auto" onClick={() => remove(todo.id!)}>
        <Trash />
      </button>
    </div>
  )
}

export default TodoItem
