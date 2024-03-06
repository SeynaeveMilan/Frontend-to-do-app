// Hello, {user}!
// There are {count} todo(s) left to do.
import '../assets/tailwind.css'

export const AppHeader = ({
  todoCount,
  title,
}: {
  todoCount?: number
  title: string
}) => {
  const welcomeMessage = () => {
    if (todoCount === undefined || todoCount === null) return null
    if (todoCount === 0) return 'You have no todos left.'
    if (todoCount === 1) return 'There is 1 todo left to do.'

    return (
      <p>
        You have <span>{todoCount} todos</span> left
      </p>
    )
  }
  return (
    <header className=" mb-6 py-12">
      <div className="border p-6 rounded-3xl text-left border-neutral-500">
        <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
          {title}
        </h1>
        <p className=" text-neutral-800 dark:text-neutral-400">
          {welcomeMessage()}
          {/* There {todoCount === 1 ? 'is' : 'are'} {todoCount}{' '}
          {todoCount === 1 ? 'todo' : 'todos'} left to do. */}
        </p>
      </div>
    </header>
  )
}
