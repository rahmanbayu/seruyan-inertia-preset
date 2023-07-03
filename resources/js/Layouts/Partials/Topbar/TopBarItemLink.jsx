import { Link } from '@inertiajs/react'

export default function TopBarItemLink({route_name, title, children, }) {
  return (
    <Link href={route(route_name)} className={`${ route().current(route_name) ? 'bg-gray-100 dark:bg-gray-950 dark:text-white' : ' dark:text-gray-400 text-gray-600' } w-full px-2.5 space-x-2 h-8 flex items-center dark:hover:bg-gray-950 dark:hover:text-gray-50 hover:bg-gray-100 rounded-md mb-1.5`} >
        {children}
        <div className={`w-full text-sm text-inherit line-clamp-1`}>{title}</div>
    </Link>
  )
}
