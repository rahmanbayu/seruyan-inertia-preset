import { CiGrid41 } from "react-icons/ci";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import NavItemLink from "./NavItemLink";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { CiLogout } from "react-icons/ci/index.esm";
import LogoutSidebarItem from "./LogoutSidebarItem";
import { HiOutlineShieldExclamation, HiOutlineUser, HiOutlineShieldCheck } from "react-icons/hi2";
import { HiLogout, HiOutlineViewGrid } from "react-icons/hi";

export default function Sidebar({user, syncStateToParent}) {
    const [fold, setFold] = useState(false);
    const { auth  } = usePage().props;
    const {roles, permissions} = auth;

    console.log(permissions);

    useEffect(()=>{
        syncStateToParent(fold)
    },[fold])
    return (
        <div className={`${fold ? 'w-14' : 'w-[22%]'} lg:block hidden min-h-screen bg-white dark:bg-gray-900 shadow-lg relative transition-all duration-150`}>
            <div className={`${fold ? 'scale-0' : 'py-6  space-y-2'} transition-all duration-150 flex items-center justify-center flex-col transform`}>
                <img className="h-[60px]" alt='Profile placeholder' src={`https://source.boringavatars.com/beam/60/${user.name}%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}/>
                <div className='text-gray-600 dark:text-gray-300 text-sm font-bold truncate max-w-[8.5rem]'>{user.name}</div>
            </div>
            <div className={`${fold ? 'flex items-center justify-center flex-col' : 'px-2.5'}`}>
                <NavItemLink route_name='dashboard' title='Dashboard' fold={fold} setFold={setFold}>
                    <HiOutlineViewGrid className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                </NavItemLink>
                <div className="shrink-0 bg-gray-200 dark:bg-gray-800 h-[1px] w-full mb-1.5"></div>
                {
                    (permissions.includes('manage users') || roles.includes('super admin')) && (
                        <NavItemLink route_name='users.index' title='Users' fold={fold} setFold={setFold}>
                            <HiOutlineUser className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                        </NavItemLink>       
                    )
                }
                {
                    roles.includes('super admin') && (
                        <>
                            <NavItemLink route_name='roles.index' title='Roles' fold={fold} setFold={setFold}>
                                <HiOutlineShieldCheck className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                            </NavItemLink>
                            <NavItemLink route_name='permissions.index' title='Permission' fold={fold} setFold={setFold}>
                                <HiOutlineShieldExclamation className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                            </NavItemLink>
                        </>
                    )
                }

                <LogoutSidebarItem title="Logout" fold={fold}>
                    <HiLogout className='w-5 h-5 flex-shrink-0 text-gray-400'/>
                </LogoutSidebarItem>
            </div>
            <button onClick={()=>setFold(prev => prev = !prev)} className={`${fold ? 'right-1/2 translate-x-1/2' : 'right-0'} transform px-3 h-14 flex items-center justify-center bg-transparent absolute top-0 transition-all duration-150`}>
                {
                    fold ? (
                        <BsArrowsExpand className="w-4 h-4 text-gray-600 dark:text-gray-300 dark:hover:text-white transform rotate-90 hover:scale-105"/>
                    ) : (
                        <BsArrowsCollapse className="w-4 h-4 text-gray-600 dark:text-gray-300 dark:hover:text-white transform rotate-90 hover:scale-105"/>
                    )
                }
            </button>
        </div>
    )
}
