import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ErrorIcon, toast, Toaster, ToastIcon } from "react-hot-toast";
import { useEffectOnce } from "react-use";
import { initTE, Ripple } from "tw-elements";

export default function GlobalWrapper({ children }) {
    const { flash } = usePage().props
    useEffect(() => {
        if(flash && flash.success){
            toast.custom((t) => (
              <Transition 
                onClick={() => toast.dismiss(t.id)}
                appear
                show={t.visible}
                enter="transition-all duration-150"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
                className={`${ t.visible ? 'animate-enter' : 'animate-leave' } flex items-center space-x-2 p-4 max-w-md w-auto bg-white dark:bg-gray-950 rounded-lg pointer-events-auto border border-emerald-400 shadow-lg dark:shadow-[0_4px_9px_-4px_rgba(52,211,153,0.8)]`} >
                <ToastIcon toast={t}/>
                <div className="text-sm text-gray-500 dark:text-gray-100">{flash.success}</div>
              </Transition>
            ))
        }
        if(flash && flash.failed){
            toast.custom((t) => (
              <Transition 
                onClick={() => toast.dismiss(t.id)}
                appear
                show={t.visible}
                enter="transition-all duration-150"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
                className={`${ t.visible ? 'animate-enter' : 'animate-leave' } flex items-center space-x-2 p-4 max-w-md w-auto bg-white dark:bg-gray-950 rounded-lg pointer-events-auto border border-rose-400 shadow-lg dark:shadow-[0_4px_9px_-4px_rgba(251 113 133,0.8)]`} >
                <ErrorIcon toast={t}/>
                <div className="text-sm text-gray-500 dark:text-gray-100">{flash.failed}</div>
              </Transition>
            ))
        }
    }, [flash]);

    useEffectOnce(()=>{
        initTE({ Ripple });
    })

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </>
    );
}
