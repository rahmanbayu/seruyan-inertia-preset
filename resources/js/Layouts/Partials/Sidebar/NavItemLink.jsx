import { Link } from '@inertiajs/react'

export default function NavItemLink({route_name, title, children, fold, setFold}) {
  return (
    <Link href={route(route_name)} className={`${ route().current(route_name) ? 'bg-gray-100 dark:bg-gray-950 dark:text-white' : ' dark:text-gray-400 text-gray-600' } ${fold ? 'w-10 h-10 p-0 justify-center' : 'w-full px-2.5 space-x-2 h-8'} flex items-center dark:hover:bg-gray-950 dark:hover:text-gray-50 hover:bg-gray-100 rounded-md`} >
        {children}
        <div className={`${fold ? 'w-0 overflow-hidden' : 'w-full'} text-sm text-inherit line-clamp-1`}>{title}</div>
    </Link>
  )
}
