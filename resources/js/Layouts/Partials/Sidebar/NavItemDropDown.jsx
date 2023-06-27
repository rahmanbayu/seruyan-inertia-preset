import { Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'
import { CiUser } from 'react-icons/ci';
import { FiChevronDown } from 'react-icons/fi';
import { IoIosArrowRoundForward } from 'react-icons/io';


// INIGAKKEPAKE
export default function NavItemDropDown({urls, title, fold, setFold}) {
    const [open, setOpen] = useState(() => {
        let value = false;
        urls.map(item => {
            if(route().current(item.route)){
                value =  true;
            }
        })
        return value;
    });
  return (
    <>
        <div className={`${ fold ? 'hidden' : 'space-x-2' } text-gray-500 relative`}>
            <div onClick={() => setOpen(prev => prev = !prev)} className={`${open ? 'bg-gray-100 dark:bg-gray-950' : ''} ${fold ? 'justify-center w-10 h-10' : 'justify-between px-2.5 h-8'} flex items-center   dark:hover:bg-gray-950 dark:hover:text-gray-50 hover:bg-gray-100 rounded-md transition-all duration-150`}>
                <div className={`${fold ? '' : 'space-x-2'} flex items-center`}>
                    <CiUser className='w-5 h-5 text-inheri flex-shrink-0'/>
                    <div className={`${fold ? 'w-0 overflow-hidden' : 'w-auto'} transition-all duration-150 text-sm text-inherit line-clamp-1`}>{title}</div>
                </div>
                <FiChevronDown className={`${ open ? 'rotate-180' : 'rotate-0' } ${fold ? 'hidden' : ''} flex-shrink-0 transform w-4 h-4 text-gray-500 transition-all duration-150`}/>
            </div>
            <div className={`${open ? 'h-24' : 'h-0'} ${fold ? 'hidden' : ''} overflow-hidden transform transition-all duration-200 mt-2`}>
                {
                    urls.map((item, index) => {
                        return (
                            <Link key={index} href={route(item.route)} className={`${route().current(item.route) ? 'dark:bg-gray-950 bg-gray-100' : ''} text-sm flex w-full h-8 items-center pl-2 space-x-2 hover:bg-gray-100 rounded-md`}>
                                <IoIosArrowRoundForward className='w-5 h-5 flex-shrink-0'/>
                                <span>{item.title}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
