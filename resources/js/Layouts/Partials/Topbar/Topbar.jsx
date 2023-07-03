import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa/index.esm";
import { IoMdSunny } from "react-icons/io/index.esm";
import TopBarItemLink from "./TopBarItemLink";
import { HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineShieldCheck, HiOutlineShieldExclamation, HiOutlineUser } from "react-icons/hi2";
import LogoutTopbarItem from "./LogoutTopbarItem";

export default function Topbar({fold}) {
    const [logoutModal, setLogoutModal] = useState(false)
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

  const props = usePage().props;

  useEffect(()=>{
      document.querySelector('html').classList.add(localStorage.getItem('theme'))
  }, [])

  const [smallSidebar, setSmallSidebar] = useState();

  return (
    <>
      <div className={`${smallSidebar ? '' : 'fixed pointer-events-none'} h-14`}></div>
      <nav className={`${smallSidebar ? 'fixed top-0 border-b border-gray-300 dark:border-gray-950' : 'relative shadow-lg'} bg-white h-14 px-5 dark:bg-gray-900 flex items-center justify-between z-10 w-full`}>
          <div className="flex items-center">
            {/* sidebar md bellow */}
            <div className="lg:hidden">
              <button onClick={() => setSmallSidebar(prev => prev = !prev)} className="flex items-center justify-center flex-col w-4 relative">
                  <div className={`${smallSidebar ? 'w-0' : 'w-4'} h-[2px] bg-gray-600 dark:bg-gray-200 transition-all duration-150 ease-in-out rounded-full mb-1`}>{' '}</div>
                  <div className={`${smallSidebar ? 'w-0' : 'w-4'} h-[2px] bg-gray-600 dark:bg-gray-200 transition-all duration-150 ease-in-out rounded-full mb-1`}>{' '}</div>
                  <div className={`${smallSidebar ? 'w-0' : 'w-4'} h-[2px] bg-gray-600 dark:bg-gray-200 transition-all duration-150 ease-in-out rounded-full`}>{' '}</div>
                  <div className={`${smallSidebar ? 'w-4' : 'w-0'} h-[2px] bg-gray-600 dark:bg-gray-200 transform rotate-45 absolute top-1/2 left-1/2 transition-all duration-150 ease-in-out rounded-full -translate-x-1/2 -translate-y-1/2`}>{' '}</div>
                  <div className={`${smallSidebar ? 'w-4' : 'w-0'} h-[2px] bg-gray-600 dark:bg-gray-200 transform -rotate-45 absolute top-1/2 left-1/2 transition-all duration-150 ease-in-out rounded-full -translate-x-1/2 -translate-y-1/2`}>{' '}</div>
              </button>
            </div>
            <div className={`${fold ? '' : 'lg:opacity-0 duration-150'} transition-all flex items-center ml-5`}>
              <div className="">
                <img className="h-8" alt='Profile placeholder' src={`https://source.boringavatars.com/beam/60/${props.auth.user.name}%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}/>
              </div>
              <div className="text-xs max-w-[9rem] truncate font-medium ml-2 text-gray-600 dark:text-gray-200">{props.auth.user.name}</div>
            </div>
          </div>
          <div className='flex items-center  mr-0 md:mr-5'>
                <button className="flex items-center justify-center h-7 w-5 relative" onClick={()=>{ if(localStorage.getItem('theme') == 'light' || localStorage.getItem('theme') == null){ selectTheme('dark') }else{ selectTheme('light') } }}>
                    <FaMoon className='w-5 h-5 text-emerald-400 dark:scale-100 scale-0 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                    <IoMdSunny className='w-5 h-5 text-orange-400 dark:scale-0 scale-100 transition-all duration-150 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                </button>
          </div>
      </nav>
      {/* backdro[p] */}
      <div onClick={() => setSmallSidebar(prev => prev = !prev)} className={`${smallSidebar ? 'bg-black/20 opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-150 fixed top-0 left-0 inset-0 z-0 lg:hidden`}> </div>
      {/* sidebar */}
      <div className={`${smallSidebar ? '' : 'opacity-0'} transition-all duration-150 pointer-events-none fixed top-0 inset-0 backdrop-blur-sm lg:hidden pt-[3.5rem]`}>
        <div className={`${smallSidebar ? 'pointer-events-auto' : 'pointer-events-none'} bg-white dark:bg-gray-900 w-[90%] sm:w-[80%] md:w-[60%] h-screen lg:pointer-events-none overflow-y-auto`}>
          <div className="px-5 py-3 flex flex-col items-center space-y-1.5">
            <TopBarItemLink route_name='dashboard' title='Dashboard'>
                <HiOutlineViewGrid className='w-5 h-5 flex-shrink-0 text-gray-400'/>
            </TopBarItemLink>
            <div className="shrink-0 bg-gray-200 dark:bg-gray-800 h-[1px] w-full mb-1.5"></div>
            <TopBarItemLink route_name='users.index' title='Users'>
              <HiOutlineUser className='w-5 h-5 flex-shrink-0 text-gray-400'/>
            </TopBarItemLink>            
            <TopBarItemLink route_name='roles.index' title='Roles'>
              <HiOutlineShieldCheck className='w-5 h-5 flex-shrink-0 text-gray-400'/>
            </TopBarItemLink>            
            <button onClick={() => setLogoutModal(prev => prev = !prev)} className={`dark:text-gray-400 text-gray-600 w-full px-2.5 space-x-2 h-8 flex items-center dark:hover:bg-gray-950 dark:hover:text-gray-50 hover:bg-gray-100 rounded-md text-left`} >
                <HiOutlineLogout className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                <div className={`w-full text-sm text-inherit line-clamp-1`}>Logout</div>
            </button>
          </div>
        </div>
      </div>

      {/* kita taruh luar karena bentrok dengan topbar yang fixed kalo sidebar di sm aktif */}
      <LogoutTopbarItem modalState={logoutModal} setModalState={setLogoutModal}/>

    </>
  )
}
