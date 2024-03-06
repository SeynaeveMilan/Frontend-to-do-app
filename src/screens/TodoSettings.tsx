import { Home } from 'lucide-react'
import { AppHeader } from '../components/AppHeader'
import { Link } from 'react-router-dom'

export const TodoSettings = () => {
  return (
    <div>
      <div className=" flex flex-col min-h-screen mx-auto max-w-lg px-6">
        <AppHeader todoCount={0} title='Settings' />
        <Link className="" to="/">
          <Home />
        </Link>
      </div>
    </div>
  )
}
