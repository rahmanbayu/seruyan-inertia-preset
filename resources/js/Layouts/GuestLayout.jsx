import DarkmodeTogle from '@/Components/Actions/DarkmodeTogle';
import GlobalWrapper from './GlobalWrapper';

export default function Guest({ children }) {
    return (
        <GlobalWrapper>
            <div className="dark:bg-gray-900 bg-gray-100 h-screen overflow-hidden dark:text-gray-300 text-gray-800 flex items-center justify-center relative">
                {children}
                <div className='absolute top-0 left-0 z-0 w-full h-screen pointer-events-none'>
                    <div className='grid grid-cols-5'>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                        <div className="border-l border-b border-transparent dark:border-[#1D2C3C] h-[20vh]"></div>
                    </div>
                </div>
            </div>
            <DarkmodeTogle/>
        </GlobalWrapper>
    );
}
