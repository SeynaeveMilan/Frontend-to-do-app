// Made by Milan &copy; 2024
import { version } from '../../package.json'

export const AppFooter = () => (
  <footer>
    <p className=" text-neutral-800 dark:text-neutral-200">
      Made by Milan {new Date().getFullYear()} &copy;
    </p>
    <p className=" font-mono text-sm text-neutral-400">v{version}</p>
  </footer>
)
