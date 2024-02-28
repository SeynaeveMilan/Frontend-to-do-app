// Hello, {user}!
// There are {count} todo(s) left to do.
import '../assets/tailwind.css'

export const AppHeader = ({ todoCount }: { todoCount: number }) => {
  return (
    <header className=" mb-6 py-12">
      <div className="border p-6 rounded-3xl text-left border-neutral-500">
        <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
          Hello, Milan!
        </h1>
        <p className=" text-neutral-800 dark:text-neutral-400">
          {' '}
          There {todoCount === 1 ? 'is' : 'are'} {todoCount}{' '}
          {todoCount === 1 ? 'todo' : 'todos'} left to do.
        </p>
      </div>
    </header>
  )
}
