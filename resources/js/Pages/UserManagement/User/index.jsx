import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';
import Pagination from '@/Components/Actions/Pagination';
import DisableActionButton from '@/Components/Actions/DisableActionButton';
import { HiOutlineTrash } from 'react-icons/hi';
import { BsShield, BsShieldExclamation } from 'react-icons/bs';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import AssignRoleToUser from './AssignRoleToUser';
import AssignDirectPermissionToUser from './AssignDirectPermissionToUser';
import DirectLogin from './DirectLogin';
import { LuEdit } from 'react-icons/lu';
import { MdLogin } from 'react-icons/md';

export default function index(props) {
    const { meta, data } = props.users;
    const [selectedDirectLogin, setSelectedDirectLogin] = useState();
    const [selectedEditUser, setSelectedEditUser] = useState();
    const [selectedAssignRole, setSelectedAssignRole] = useState();
    const [selectedDirectPermission, setSelectedDirectPermission] = useState();

    const [filter, setFilter] = useState({
        search: props.filters.search || '',
        sort: props.filters.sort || '',
        per_page: props.filters.per_page || ''
    });

    const [value] = useDebounce(filter.search, 300);
    const [sortDebounced] = useDebounce(filter.sort, 300);

    const prevFilter = usePrevious(filter);

    const onChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    }

    const resetFilter = () => {
        setFilter({
            search: '',
            sort: '',
            per_page: ''
        })
    }

    useEffect(() => {
        if (prevFilter) {
            const query = Object.keys(pickBy(filter)).length
                ? pickBy(filter)
                : { remember: 'forget' };
            router.get(route(route().current()), query, {
                replace: true,
                preserveState: true
            });
        }
    }, [sortDebounced, value, filter.per_page]);

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <DirectLogin getter={selectedDirectLogin} setter={setSelectedDirectLogin} />
            <EditUser getter={selectedEditUser} setter={setSelectedEditUser} />
            <AssignRoleToUser roles={props.roles} getter={selectedAssignRole} setter={setSelectedAssignRole} />
            <AssignDirectPermissionToUser permissions={props.permissions} getter={selectedDirectPermission} setter={setSelectedDirectPermission} />
            <div className='dark:bg-gray-900 bg-white rounded-lg p-5 shadow-lg'>
                {/* header */}
                <div className='flex flex-col md:flex-row md:items-center md:space-y-0 space-y-4 justify-between'>
                    <div>
                        <h1 className='font-medium text-gray-700 dark:text-gray-200'>User</h1>
                        <p className="mt-1 text-xs text-gray-400">Manajemen data user berserta role & permission.</p>
                    </div>
                    <div className="flex md:flex-row flex-col-reverse md:items-center gap-x-2 md:gap-y-0 gap-y-4">
                        <div className='md:w-auto w-full'>
                            <input type="text" id='search' name='search' placeholder='Search . . .' value={filter.search} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 md:w-auto w-full' />
                        </div>
                        <select name="per_page" id="per_page" value={filter.per_page} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 md:w-auto w-full'>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                        </select>
                        <CreateUser roles={props.roles} />
                    </div>
                </div>
                {/* table content */}
                <div className="flex flex-col  overflow-hidden mt-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="font-medium text-gray-800 dark:text-gray-200">
                                        <tr>
                                            <th scope="col" className="px-2 py-4 text-xs">#</th>
                                            <th scope="col" className="px-2 py-4 text-xs">
                                                <span className='cursor-pointer'>Nama</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-xs">
                                                <span className='cursor-pointer'>Email</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-xs">
                                                <span className='cursor-pointer'>Roles</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-xs">
                                                <span className='cursor-pointer'>Direct Permission</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-xs text-right">
                                                <span>Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm text-gray-600 dark:text-gray-300'>
                                        {
                                            data && data.length != 0 ?
                                                data.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td className="whitespace-nowrap px-2 py-4">{meta.from + index}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[10rem] truncate">{user.name}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[13rem] truncate">{user.email}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            <div className='flex items-center gap-0.5 max-w-xs flex-wrap'>
                                                                {user.roles.map((item, index) => (
                                                                    <span className={`${item.name == 'super admin' ? 'bg-cyan-400 dark:bg-cyan-500' : 'bg-gray-400 dark:bg-gray-950'} text-[0.7rem] text-white px-1 py-0.5 inline-block font-medium`} key={index}>{item.name}</span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            <div className='flex items-center gap-0.5 max-w-xs flex-wrap'>
                                                                {user.direct_permissions.map((item, index) => (
                                                                    <span className='text-[0.7rem] text-white bg-gray-400 dark:bg-gray-950 px-1 py-0.5 inline-block font-medium' key={index}>{item.name}</span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            {
                                                                (user.id == 1 && !props.auth.roles.includes('super admin')) ? (
                                                                    <div className='flex items-center justify-end'>
                                                                        {
                                                                            props.auth.roles.includes('super admin') && (
                                                                                <>
                                                                                    <DisableActionButton title="permission">
                                                                                        <BsShieldExclamation className='w-4 h-4 text-white flex-shrink-0' />
                                                                                    </DisableActionButton>
                                                                                    <div className='pl-2'></div>
                                                                                </>
                                                                            )
                                                                        }
                                                                        <DisableActionButton title="role">
                                                                            <BsShield className='w-4 h-4 text-white flex-shrink-0' />
                                                                        </DisableActionButton>
                                                                        <div className='pl-2'></div>
                                                                        <DisableActionButton title="edit">
                                                                            <LuEdit className='w-4 h-4 text-white flex-shrink-0' />
                                                                        </DisableActionButton>
                                                                        {
                                                                            (props.auth.permissions.includes('direct login') || props.auth.roles.includes('super admin')) && (
                                                                                <>
                                                                                    <div className='pl-2'></div>
                                                                                    <DisableActionButton title="login">
                                                                                        <MdLogin className='w-4 h-4 text-white flex-shrink-0' />
                                                                                    </DisableActionButton>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <div className='flex items-center justify-end'>
                                                                        {
                                                                            props.auth.roles.includes('super admin') && (
                                                                                <>
                                                                                    <button onClick={() => setSelectedDirectPermission(user)} type="button" className="rounded bg-indigo-400 dark:bg-indigo-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#818cf8] transition duration-150 ease-in-out dark:hover:bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.3),0_4px_18px_0_rgba(79,70,229,0.2)] focus:bg-indigo-500 focus:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.3),0_4px_18px_0_rgba(79,70,229,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-500 active:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.3),0_4px_18px_0_rgba(79,70,229,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(79,70,229,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.2),0_4px_18px_0_rgba(79,70,229,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.2),0_4px_18px_0_rgba(79,70,229,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(79,70,229,0.2),0_4px_18px_0_rgba(79,70,229,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                                        <BsShieldExclamation className='w-4 h-4 text-white flex-shrink-0' />
                                                                                        <span className='text-[0.6rem] leading-[0]'>Permission</span>
                                                                                    </button>
                                                                                    <div className='pl-2'></div>
                                                                                </>
                                                                            )
                                                                        }
                                                                        <button onClick={() => setSelectedAssignRole(user)} type="button" className="rounded bg-cyan-400 dark:bg-cyan-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#22d3ee] transition duration-150 ease-in-out dark:hover:bg-cyan-600 hover:bg-cyan-500 hover:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.3),0_4px_18px_0_rgba(8 145 178,0.2)] focus:bg-cyan-500 focus:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.3),0_4px_18px_0_rgba(8 145 178,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-500 active:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.3),0_4px_18px_0_rgba(8 145 178,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(8 145 178,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.2),0_4px_18px_0_rgba(8 145 178,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.2),0_4px_18px_0_rgba(8 145 178,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(8 145 178,0.2),0_4px_18px_0_rgba(8 145 178,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                            <BsShield className='w-4 h-4 text-white flex-shrink-0' />
                                                                            <span className='text-[0.6rem] leading-[0]'>Role</span>
                                                                        </button>
                                                                        <div className='pl-2'></div>
                                                                        <button onClick={() => setSelectedEditUser(user)} type="button" className="rounded bg-emerald-400 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#34d399] transition duration-150 ease-in-out hover:bg-emerald-500 hover:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.3),0_4px_18px_0_rgba(52,211,153,0.2)] focus:bg-emerald-500 focus:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.3),0_4px_18px_0_rgba(52,211,153,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-500 active:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.3),0_4px_18px_0_rgba(52,211,153,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(52,211,153,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.2),0_4px_18px_0_rgba(52,211,153,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.2),0_4px_18px_0_rgba(52,211,153,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(52,211,153,0.2),0_4px_18px_0_rgba(52,211,153,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                            <LuEdit className='w-4 h-4 text-white flex-shrink-0' />
                                                                            <span className='text-[0.6rem] leading-[0]'>Edit</span>
                                                                        </button>
                                                                        {
                                                                            (props.auth.permissions.includes('direct login') || props.auth.roles.includes('super admin')) && (
                                                                                <>
                                                                                    <div className='pl-2'></div>
                                                                                    <button onClick={() => setSelectedDirectLogin(user)} type="button" className="rounded bg-slate-400 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#94a3b8] transition duration-150 ease-in-out hover:bg-slate-500 hover:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.3),0_4px_18px_0_rgba(148,163,184,0.2)] focus:bg-slate-500 focus:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.3),0_4px_18px_0_rgba(148,163,184,0.2)] focus:outline-none focus:ring-0 active:bg-slate-500 active:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.3),0_4px_18px_0_rgba(148,163,184,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(148,163,184,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.2),0_4px_18px_0_rgba(148,163,184,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.2),0_4px_18px_0_rgba(148,163,184,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(148,163,184,0.2),0_4px_18px_0_rgba(148,163,184,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                                        <MdLogin className='w-4 h-4 text-white flex-shrink-0' />
                                                                                        <span className='text-[0.6rem] leading-[0]'>Login</span>
                                                                                    </button>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }

                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td colSpan="6" className='text-center py-4'>Tidak ada data!</td>
                                                </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end of table content */}
                {/* pagination */}
                {/* <Pagination links={meta.links}/> */}
            </div>
        </AuthenticatedLayout>
    )
}
