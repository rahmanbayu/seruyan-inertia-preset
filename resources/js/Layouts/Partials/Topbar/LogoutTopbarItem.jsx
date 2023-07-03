import { useForm } from '@inertiajs/react';
import { RiCloseFill } from 'react-icons/ri';

export default function LogoutTopbarItem({modalState, setModalState}) {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
  })
  function submit(e) {
      e.preventDefault()
      post(route('logout'), {
          onSuccess: ()=>{
            setModalState(false)
            localStorage.removeItem('sidebarfold')
          }
      })
  }

  return (
    <>
      <div onClick={() => setModalState(prev => prev = !prev)} className={`${modalState ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'} fixed inset-0 bg-black transition-all duration-150 z-20`}></div>
      <div className={`${modalState ? '' : 'translate-y-5 opacity-0 pointer-events-none'} transform transition-all duration-150 ease-in fixed inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm z-20`}>
          <div className={`${modalState ? 'pointer-events-auto' : 'pointer-events-none'} bg-white w-[90%] sm:w-[85%] md:w-1/2 lg:w-[40%] rounded-2xl p-4 max-h-[90vh] overflow-y-auto text-sm shadow-xl`}>
              <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-700">Logout</h3>
                  <button onClick={() => setModalState(prev => prev = !prev)} className="">
                      <RiCloseFill className="w-5 h-5 text-gray-500"/>
                  </button>
              </div>
              <div className='mt-6 text-sm text-gray-500 whitespace-normal'>
                Apakah anda ingin Log Out, dari sesi ini!
              </div>
              <div className="mt-6">
                  <form  onSubmit={submit}>
                      <div className="mt-5">
                          <button disabled={processing} type="submit" className="relative rounded bg-sky-400 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0EA5E9] transition duration-150 ease-in-out hover:bg-sky-500 hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:bg-sky-500 focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:outline-none focus:ring-0 active:bg-sky-500 active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(14,165,233,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] flex items-center" data-te-ripple-init data-te-ripple-color="light">
                              <svg className={`${processing ? 'opacity-100' : 'opacity-0'} w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                  <circle cx={50} cy={50} fill="none" stroke="#ffffff" strokeWidth={11} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
                                      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.1363636363636365s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                  </circle>
                              </svg>
                              <span className={`${processing ? 'opacity-0' : 'opacity-100 relative'} text-xs`}>Ya, Logout</span>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </>
  )
}
