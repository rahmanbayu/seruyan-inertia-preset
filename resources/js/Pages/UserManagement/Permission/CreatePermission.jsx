import { useForm } from "@inertiajs/react";
import { useState } from "react"
import { HiPlus } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

export default function CreatePermision() {
    const [modalState, setModalState] = useState(false);
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('permissions.store'), {
            onSuccess: ()=>{
                setModalState(false)
                reset()
                clearErrors()
            }
        })
    }

  return (
    <>
        <button onClick={() => setModalState(prev => prev = !prev)} type="button" className="rounded dark:bg-sky-500 dark:hover:bg-sky-600 bg-sky-400 px-3 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0EA5E9] transition duration-150 ease-in-out hover:bg-sky-500 hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:bg-sky-500 focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:outline-none focus:ring-0 active:bg-sky-500 active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(14,165,233,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] flex items-center md:w-auto w-full" data-te-ripple-init data-te-ripple-color="light">
            <HiPlus className="w-4 h-4"/>
            <span className='text-xs'>Tambah Role</span>
        </button>

        <div onClick={() => setModalState(false)} className={`${modalState ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'} fixed inset-0 bg-black transition-all duration-150`}></div>
        
        <div className={`${modalState ? '' : 'translate-y-5 opacity-0 pointer-events-none'} transform transition-all duration-150 ease-in fixed inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm`}>
            <div className={`${modalState ? 'pointer-events-auto' : 'pointer-events-none'} bg-white w-[90%] sm:w-[85%] md:w-1/2 lg:w-[40%] rounded-2xl p-4 max-h-[90vh] overflow-y-auto text-sm shadow-xl`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-700">Tambah Role</h3>
                    <button onClick={() => setModalState(false)} className="">
                        <RiCloseFill className="w-5 h-5 text-gray-500"/>
                    </button>
                </div>
                <div className="mt-6">
                    <form  onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="text-sm mb-1 flex items-center">Nama <sup className="text-rose-500 text-base leading-none tracking-tighter">*</sup></label>
                            <input type="text" id="name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} className="px-2 py-1.5 outline-none focus:ring-2 ring-sky-200 w-full rounded border hover:border-sky-300 focus:border-sky-500"/>
                            {errors.name && <div className='mt-1 text-sm text-rose-500'>{errors.name}</div>}
                        </div>
                        <div className="mt-5">
                            <button disabled={processing} type="submit" className="relative ml-1 rounded bg-sky-400 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0EA5E9] transition duration-150 ease-in-out hover:bg-sky-500 hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:bg-sky-500 focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:outline-none focus:ring-0 active:bg-sky-500 active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(14,165,233,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] flex items-center" data-te-ripple-init data-te-ripple-color="light">
                                <svg className={`${processing ? 'opacity-100' : 'opacity-0'} w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx={50} cy={50} fill="none" stroke="#ffffff" strokeWidth={11} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
                                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.1363636363636365s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                    </circle>
                                </svg>
                                <span className={`${processing ? 'opacity-0' : 'opacity-100 relative'} text-xs`}>Simpan</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
