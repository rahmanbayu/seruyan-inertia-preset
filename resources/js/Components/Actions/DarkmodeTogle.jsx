import React, { useEffect } from 'react'
import {FaMoon} from 'react-icons/fa'
import {IoMdSunny} from 'react-icons/io'

export default function DarkmodeTogle() {
  const selectTheme = (value)=>{
      localStorage.setItem('theme', value)
      const html = document.querySelector('html');
      html.classList.add(localStorage.getItem('theme'))
      if(value == 'dark'){
        html.classList.remove('light')
      }else{
        html.classList.remove('dark')
      }
  }

  useEffect(()=>{
      document.querySelector('html').classList.add(localStorage.getItem('theme'))
  }, [])

  return (
    <button onClick={()=>{
      if(localStorage.getItem('theme') == 'light' || localStorage.getItem('theme') == null){
        selectTheme('dark')
      }else{
        selectTheme('light')
      }

    }} className={`dark:justify-end justify-start fixed top-7 md:bottom-7 right-7 flex items-center border border-gray-300 dark:border-gray-700 rounded-full w-16 h-8 dark:bg-gray-800 bg-white transition-all duration-150 z-20`}>
        <div className='flex items-center justify-between w-full px-2'>
            <FaMoon className='w-5 h-5 text-emerald-400'/>
            <IoMdSunny className='w-5 h-5 text-orange-400'/>
        </div>
        <div className={`transform w-7 h-7 dark:bg-gray-950 bg-emerald-500 absolute rounded-full transition-all duration-200`}> </div>
    </button>
  )
}
