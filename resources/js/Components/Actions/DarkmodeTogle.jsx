import React, { useEffect } from 'react'
import { FaMoon } from 'react-icons/fa'
import { IoMdSunny } from 'react-icons/io'

export default function DarkmodeTogle() {
  const selectTheme = (value) => {
    localStorage.setItem('theme', value)
    const html = document.querySelector('html');
    html.classList.add(localStorage.getItem('theme'))
    if (value == 'dark') {
      html.classList.remove('light')
    } else {
      html.classList.remove('dark')
    }
  }

  useEffect(() => {
    document.querySelector('html').classList.add(localStorage.getItem('theme'))
  }, [])

  return (
    // <button onClick={() => {
    //   if (localStorage.getItem('theme') == 'light' || localStorage.getItem('theme') == null) {
    //     selectTheme('dark')
    //   } else {
    //     selectTheme('light')
    //   }

    // }} className={`dark:justify-end justify-start fixed top-7 md:bottom-7 right-7 flex items-center border border-gray-300 dark:border-gray-700 rounded-full md:w-12 md:h-7 lg:w-16 lg:h-8 dark:bg-gray-800 bg-white transition-all duration-150 z-20`}>
    //   <div className='flex items-center justify-between w-full px-2'>
    //     <FaMoon className='h-3 w-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-400' />
    //     <IoMdSunny className='h-3 w-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-orange-400' />
    //   </div>
    //   <div className={`transform w-4 h-4 md:w-5 md:h-5 lg:w-7  lg:h-7 dark:bg-gray-950 bg-emerald-500 absolute rounded-full transition-all duration-200`}> </div>
    // </button>
    <button onClick={() => {
      if (localStorage.getItem('theme') == 'light' || localStorage.getItem('theme') == null) {
        selectTheme('dark')
      } else {
        selectTheme('light')
      }

    }} className="flex items-center justify-center h-7 w-5 fixed top-4 right-4 z-20">
      <FaMoon className='w-6 h-6 text-emerald-400 dark:scale-100 scale-0 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
      <IoMdSunny className='w-6 h-6 text-orange-400 dark:scale-0 scale-100 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
    </button >
  )
}
