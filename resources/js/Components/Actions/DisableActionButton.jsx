export default function DisableActionButton({title, children}) {
  return (
        <button disabled type="button" className="rounded bg-gray-300 dark:bg-gray-700 px-2 py-1 text-xs font-medium uppercase leading-normal text-white flex items-center space-x-1 pointer-events-none">
            <div>
                {children}
            </div>
            <span className='text-[0.6rem] leading-[0]'>{title}</span>
        </button>
  )
}
