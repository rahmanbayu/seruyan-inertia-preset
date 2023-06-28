import { useState } from 'react';
import GlobalWrapper from './GlobalWrapper';
import Sidebar from './Partials/Sidebar/Sidebar';
import Topbar from './Partials/Topbar/Topbar';

export default function Authenticated({ user, header, children }) {
    const [sidebarFoldStatus, setSidebarFoldStatus] = useState(false);

    return (
        <GlobalWrapper>
            <div className='min-h-screen bg-gray-50 dark:bg-gray-950 relative'>
                <div className='flex w-full'>
                    {/* Sidebar class:  lg:block hidden w-[22%] z-10 min-h-screen bg-white dark:bg-gray-900 shadow-lg */}
                    <Sidebar user={user} syncStateToParent={setSidebarFoldStatus}/>
                    <div className='w-full z-0 min-h-screen'>
                        <Topbar fold={sidebarFoldStatus}/>
                        <div className='px-4 py-5 md:p-10'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </GlobalWrapper>
    );
}
