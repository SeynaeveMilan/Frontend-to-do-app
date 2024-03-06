import { Settings } from 'lucide-react'
import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'
import '../assets/tailwind.css'

import React, { useState } from 'react'
import { Todo } from '../models/Todo'
// import { uid } from 'uid'
import { Link } from 'react-router-dom'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'

export const TodoOverview = () => {
  // TODO: show error message when input is empty
  // TODO: make the input field required (input validation  - visible)
  //
  // TODO: release better version (v1.1.0)

  // const [isValid, setIsValid] = useState({
  //   task: {
  //     dirty: false, // If the user has interacted with the input
  //     valid: false,
  //   },
  //   category: {
  //     dirty: false,
  //     valid: false,
  //   },
  // })

  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )

  // const [newTodo, setNewTodo] = useState<Todo>({
  //   task: '',
  //   category: 'choose',
  //   isCompleted: false,
  // })
  // useEffect(() => {
  //   localStorage.todos = JSON.stringify(todos)
  // }, [todos])
  //wat commentaar negeer dit

  // const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault() // Stop posting naar dezelfde pagina

  //   if (newTodo.task === '' || newTodo.category === 'choose') return //Als er geen taak is, return dan (doe niets

  //   setNewTodo(() => {
  //     const currentNewTodo = { ...newTodo, id: uid() }
  //     setTodos([...todos, currentNewTodo])
  //     return currentNewTodo
  //   }) //Voeg een id toe aan de nieuwe todo
  //   setTodos([...todos, newTodo]) //Combineer de huidige todos met de nieuwe todo
  //   setNewTodo({
  //     task: '',
  //     category: 'choose',
  //     isCompleted: false,
  //   }) //Reset de input velden
  // }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // const removeWithDelay = (id: string) => {
  //   setTimeout(() => {
  //     setTodos(todos.filter(todo => todo.id !== id))
  //   }, 4000)
  // }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // useEffect(() => {
  //   console.log({ newTodo })
  // }, [newTodo])
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
        <TodoInput
          addParentState={(newTodo: Todo) => setTodos([...todos, newTodo])}
        />
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id!}
              remove={removeTodo}
              // removedelay={removeWithDelay}
              todo={todo}
              toggle={toggleTodo}
            />
            // DONE: fade todo when checked
          ))}
        </div>

        {/* Footer: about the app (c) Milan - CURRENT YEAR */}
        <AppFooter />
      </div>
    </div>
  )
}
