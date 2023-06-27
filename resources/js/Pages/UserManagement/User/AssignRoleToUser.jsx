import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BsShield, BsShieldExclamation } from "react-icons/bs/index.esm";
import { HiOutlineTrash } from "react-icons/hi/index.esm";
import { RiCloseFill } from "react-icons/ri/index.esm";

export default function AssignRoleToUser(props) {
    const {user, roles} = props;
    const [modalState, setModalState] = useState(false);

    const { data, setData, post,  delete: destroy, processing, errors, clearErrors, reset } = useForm({
        roles: user.roles.map(i => i.id +'') || [],
    })

    const handleChecked = (e) => {
        let id = e.target.value;
        if (e.target.checked) {
            setData("roles", [...data.roles, id]);
        } else {
            setData(
                "roles",
                data.roles.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    function submit(e) {
        e.preventDefault()
        post(route('users.assign_role', user), {
            onSuccess: ()=>{
                setModalState(false)
            }
        })
    }

    const modalTogleAndReset = ()=>{
        if(!processing){
            setModalState(prev => prev = !prev);
            clearErrors()
            reset()
        }
    }


    return (
        <>
            <button onClick={modalTogleAndReset} type="button" className="rounded bg-cyan-400 dark:bg-cyan-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#4ade80] transition duration-150 ease-in-out dark:hover:bg-cyan-600 hover:bg-cyan-500 hover:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] focus:bg-cyan-500 focus:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-500 active:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                <div>
                    <BsShield className='w-4 h-4 text-white flex-shrink-0'/>
                </div>
                <span className='text-[0.6rem] leading-[0]'>Role</span>
            </button>

            <div onClick={modalTogleAndReset} className={`${modalState ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'} fixed inset-0 bg-black transition-all duration-150`}></div>

            <div className={`${modalState ? '' : 'translate-y-5 opacity-0 pointer-events-none'} transform transition-all duration-150 ease-in fixed inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm`}>
                <div className={`${modalState ? 'pointer-events-auto' : 'pointer-events-none'} bg-white w-[90%] sm:w-[85%] md:w-[60%] rounded-2xl p-4 max-h-[90vh] overflow-y-auto text-sm shadow-xl`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-700">Assign Roles To User</h3>
                        <button onClick={modalTogleAndReset} className="">
                            <RiCloseFill className="w-5 h-5 text-gray-500"/>
                        </button>
                    </div>
                    <div className="mt-5">
                        <form  onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                                {
                                    roles.map((item, index) => (
                                        <label htmlFor={`roles${index}-${user.id}`} className="flex items-center space-x-1" key={index}>
                                            <input value={item.id} onChange={handleChecked} checked={data.roles.includes(item.id+'')} type="checkbox" name="roles[]" id={`roles${index}-${user.id}`} />
                                            <span className="text-sm text-gray-500">{item.name}</span>
                                        </label>
                                    ))
                                }
                            </div>
                            <div className="mt-5">
                                <button disabled={processing} type="submit" className="relative rounded bg-sky-400 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0EA5E9] transition duration-150 ease-in-out hover:bg-sky-500 hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:bg-sky-500 focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:outline-none focus:ring-0 active:bg-sky-500 active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(14,165,233,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] flex items-center" data-te-ripple-init data-te-ripple-color="light">
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
