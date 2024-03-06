import { Check, ChevronDown, Plus, Settings, Trash } from 'lucide-react'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import '../assets/tailwind.css'

import React, { useEffect, useState } from 'react'
import { Todo } from '../models/Todo'
import { uid } from 'uid'
import { Link } from 'react-router-dom'

export const TodoOverview = () => {
  // TODO: show error message when input is empty
  // TODO: make the input field required (input validation  - visible)
  //
  // TODO: release better version (v1.1.0)

  const [isValid, setIsValid] = useState({
    task: {
      dirty: false, // If the user has interacted with the input
      valid: false,
    },
    category: {
      dirty: false,
      valid: false,
    },
  })

  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )

  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: 'choose',
    isCompleted: false,
  })
  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])
  //wat commentaar negeer dit

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Stop posting naar dezelfde pagina

    if (newTodo.task === '' || newTodo.category === 'choose') return //Als er geen taak is, return dan (doe niets

    setNewTodo(() => {
      const currentNewTodo = { ...newTodo, id: uid() }
      setTodos([...todos, currentNewTodo])
      return currentNewTodo
    }) //Voeg een id toe aan de nieuwe todo
    setTodos([...todos, newTodo]) //Combineer de huidige todos met de nieuwe todo
    setNewTodo({
      task: '',
      category: 'choose',
      isCompleted: false,
    }) //Reset de input velden
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const removeWithDelay = (id: string) => {
    setTimeout(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    }, 4000)
  }

  useEffect(() => {
    console.log({ newTodo })
  }, [newTodo])
  return (
    <div>
      <div className=" flex flex-col min-h-screen mx-auto max-w-lg px-6">
        {/* Header: amount of todos & welcome message*/}
        <AppHeader
          todoCount={todos.filter((t: Todo) => !t.isCompleted).length}
          title="Hello, Milan"
        />
        <Link to="/settings" className=" my-4">
          <Settings />
        </Link>
        <div className="flex-1">
          <form className="flex gap-3 mx-2" onSubmit={addNewTodo}>
            <div className="w-full mb-8">
              <div>
                <input
                  className=" bg-neutral-200 dark:bg-neutral-800 block w-full rounded-2xl p-2 "
                  type="text"
                  name="new-todo"
                  placeholder="Add a todo"
                  id="new-todo"
                  value={newTodo.task}
                  onInput={(event: React.FormEvent<HTMLInputElement>) => {
                    setIsValid({
                      ...isValid,
                      task: {
                        dirty: true,
                        valid: event.currentTarget.value.length > 0,
                      },
                    })
                    setNewTodo({
                      ...newTodo,
                      task: event.currentTarget.value,
                    })
                  }}
                ></input>
              </div>
              <div className="flex justify-between items-center relative">
                <select
                  className="w-full appearance-none p-2 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-2xl mt-2 relative text-neutral-400"
                  name="category"
                  id="category"
                  value={newTodo.category}
                  onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                    setIsValid({
                      ...isValid,
                      task: {
                        dirty: true,
                        valid: event.currentTarget.value !== 'choose',
                      },
                    })
                    setNewTodo({
                      ...newTodo,
                      category: event.currentTarget.value,
                    })
                  }}
                >
                  <option disabled value={'choose'}>
                    Choose a category
                  </option>
                  <option value="work">Work</option>
                  <option value="hobby">Hobby</option>
                  <option value="school">School</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/4 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="items-center">
              <button
                className=" rounded-full bg-orange-600 p-3 translate-y-6 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isValid.task.valid || !isValid.category.valid}
              >
                <Plus className=" text-neutral-800" />
                <span className=" sr-only">Add todo</span>
              </button>
            </div>
          </form>
          {todos.map((todo: Todo) => (
            // DONE: fade todo when checked
            <div
              key={todo.id}
              className={`border bg-neutral-800 mt-4 rounded-2xl p-4 border-neutral-500 flex items-center ${
                todo.isCompleted ? 'opacity-30' : 'placeholder-opacity-100'
              }`}
            >
              <input
                id={todo.id}
                type="checkbox"
                className="hidden" // Hide the default checkbox
                onChange={() => {
                  // Toggle the completed status of the todo
                  const updatedTodos = todos.map(t =>
                    t.id === todo.id
                      ? { ...t, isCompleted: !t.isCompleted }
                      : t,
                  )
                  setTodos(updatedTodos)
                  if (todo.id) {
                    removeWithDelay(todo.id)
                  }
                }}
                checked={todo.isCompleted} // Reflect the completed status
              />
              <label
                htmlFor={todo.id}
                className="text-lg ml-2 font-semibold text-neutral-300 flex items-center cursor-pointer"
              >
                <span
                  className={`rounded-full border-2  w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
                    todo.isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'bg-transparent border-red-500'
                  }`}
                >
                  {todo.isCompleted && <Check className="h-3 w-3 text-white" />}
                </span>
                <span className="ml-3">{todo.task}</span>
                {/* Displaying category under the task */}
                <div className="ml-3 flex">
                  <p className="text-sm">{todo.category}</p>
                </div>
              </label>
              {/* Trash icon placed all the way to the right */}
              <button className="ml-auto" onClick={() => removeTodo(todo.id!)}>
                <Trash />
              </button>
            </div>
          ))}
        </div>

        {/* Footer: about the app (c) Milan - CURRENT YEAR */}
        <AppFooter />
      </div>
    </div>
  )
}
