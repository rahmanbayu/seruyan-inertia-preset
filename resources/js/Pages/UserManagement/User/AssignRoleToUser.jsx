import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BsShield, BsShieldExclamation } from "react-icons/bs/index.esm";
import { HiOutlineTrash } from "react-icons/hi/index.esm";
import { RiCloseFill } from "react-icons/ri/index.esm";

export default function AssignRoleToUser(props) {
    const { setter, getter, roles } = props;
    const { data, setData, post, delete: destroy, processing, errors, clearErrors, reset } = useForm({
        roles: [],
    })

    useEffect(() => {
        setData('roles', getter ? getter.roles.map(i => i.id + '') : [])
    }, [getter])

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
        post(route('users.assign_role', getter), {
            onSuccess: (e) => {
                setter(undefined)
                reset()
                clearErrors()
            },
        })
    }

    const closeModal = () => {
        if (!processing) {
            setter(undefined)
            reset()
            clearErrors()
        }
    }


    return (
        <>
            <div onClick={closeModal} className={`${getter != undefined ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'} fixed inset-0 bg-black transition-all duration-150 z-20`}></div>

            <div className={`${getter != undefined ? '' : 'translate-y-5 opacity-0 pointer-events-none'} transform transition-all duration-150 ease-in fixed inset-0 flex items-center justify-center z-20 pointer-events-none backdrop-blur-sm`}>
                <div className={`${getter != undefined ? 'pointer-events-auto' : 'pointer-events-none'} border border-transparent dark:border-gray-800 bg-white dark:bg-gray-900 sm:w-[85%] md:w-[60%] rounded-2xl p-4 max-h-[90vh] overflow-y-auto text-sm shadow-xl`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">Assign Roles To User</h3>
                        <button onClick={closeModal} className="">
                            <RiCloseFill className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        </button>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                                {
                                    roles.map((item, index) => (
                                        <label htmlFor={`roles${index}`} className="flex items-center space-x-1" key={index}>
                                            <input value={item.id} onChange={handleChecked} checked={data.roles.includes(item.id + '')} type="checkbox" name="roles[]" id={`roles${index}`} />
                                            <span className="text-sm text-gray-500 dark:text-gray-300">{item.name}</span>
                                        </label>
                                    ))
                                }
                            </div>
                            <div className="mt-5 flex items-center space-x-3">
                                <button onClick={closeModal} type="button" disabled={processing} className="dark:disabled:bg-neutral-600 disabled:bg-neutral-500 relative rounded bg-neutral-400 dark:bg-neutral-500 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#737373] transition duration-150 ease-in-out dark:hover:bg-neutral-600 hover:bg-neutral-500 hover:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.3),0_4px_18px_0_rgba(163,163,163,0.2)] dark:focus:bg-neutral-600 focus:bg-neutral-500 focus:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.3),0_4px_18px_0_rgba(163,163,163,0.2)] focus:outline-none focus:ring-0 dark:active:bg-neutral-600 active:bg-neutral-500 active:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.3),0_4px_18px_0_rgba(163,163,163,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(163,163,163,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.2),0_4px_18px_0_rgba(163,163,163,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.2),0_4px_18px_0_rgba(163,163,163,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(163,163,163,0.2),0_4px_18px_0_rgba(163,163,163,0.1)] flex items-center" data-te-ripple-init data-te-ripple-color="light">
                                    <span className={`relative text-xs`}>Tidak</span>
                                </button>

                                <button disabled={processing} type="submit" className="dark:disabled:bg-sky-500 disabled:bg-sky-500 relative rounded bg-sky-400 dark:bg-sky-500 px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0EA5E9] transition duration-150 ease-in-out dark:hover:bg-sky-600 hover:bg-sky-500 hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:focus:bg-sky-600 focus:bg-sky-500 focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] focus:outline-none focus:ring-0 dark:active:bg-sky-600 active:bg-sky-500 active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.3),0_4px_18px_0_rgba(14,165,233,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(14,165,233,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(14,165,233,0.2),0_4px_18px_0_rgba(14,165,233,0.1)] flex items-center" data-te-ripple-init data-te-ripple-color="light">
                                    <svg className={`${processing ? 'opacity-100' : 'opacity-0'} w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <circle cx={50} cy={50} fill="none" stroke="#ffffff" strokeWidth={11} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
                                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.1363636363636365s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                        </circle>
                                    </svg>
                                    <span className={`${processing ? 'opacity-0' : 'opacity-100 relative'} text-xs tracking-wider`}>Simpan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
