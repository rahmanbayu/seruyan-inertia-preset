import { useEffect } from "react";
import { FaMoon } from "react-icons/fa/index.esm";
import { IoMdSunny } from "react-icons/io/index.esm";

export default function Topbar() {
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
    <nav className='bg-white h-14 px-6 shadow-lg dark:bg-gray-900 flex items-center justify-between'>
        <div></div>
        <div className='flex items-center  '>
              <button className="justify-center h-7 rounded-full relative" onClick={()=>{ if(localStorage.getItem('theme') == 'light' || localStorage.getItem('theme') == null){ selectTheme('dark') }else{ selectTheme('light') } }}>
                  <FaMoon className='w-5 h-5 text-emerald-400 dark:scale-100 scale-0 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                  <IoMdSunny className='w-5 h-5 text-orange-400 dark:scale-0 scale-100 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
              </button>
        </div>
    </nav>
  )
}
