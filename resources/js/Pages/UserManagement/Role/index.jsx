import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import CreateRole from './CreateRole';
import { useDebounce } from 'use-debounce';
import { router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';
import Pagination from '@/Components/Actions/Pagination';
import DeleteRole from './DeleteRole';
import AsignPermissionToRole from './AsignPermissionToRole';
import DisableActionButton from '@/Components/Actions/DisableActionButton';
import { HiOutlineTrash } from 'react-icons/hi/index.esm';
import { BsShieldExclamation } from 'react-icons/bs/index.esm';

export default function index(props) {
    const { meta, data } = props.roles;
    const [selectedDeleteRole, setSelectedDeleteRole] = useState();
    const [selectedAssignPermission, setSelectedAssignPermission] = useState();
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
            <DeleteRole getter={selectedDeleteRole} setter={setSelectedDeleteRole} />
            <AsignPermissionToRole getter={selectedAssignPermission} setter={setSelectedAssignPermission} permissions={props.permissions} />
            <div className='dark:bg-gray-900 bg-white rounded-lg p-5 shadow-lg'>
                {/* header */}
                <div className='flex flex-col md:flex-row md:items-center md:space-y-0 space-y-4 justify-between'>
                    <div>
                        <h1 className='font-medium text-gray-700 dark:text-gray-200'>Role</h1>
                        <p className="mt-1 text-xs text-gray-400">Manajemen role.</p>
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
                        <CreateRole />
                    </div>
                </div>
                {/* table content */}
                <div className="flex flex-col  overflow-hidden mt-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="font-medium text-xs text-gray-800 dark:text-gray-200">
                                        <tr>
                                            <th scope="col" className="px-2 py-4">#</th>
                                            <th scope="col" className="px-2 py-4">
                                                <span className='cursor-pointer'>Nama</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4">
                                                <span className='cursor-pointer'>User</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4">
                                                <span>Permissions</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-right">
                                                <span>Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm text-gray-600 dark:text-gray-300'>
                                        {
                                            data.length != 0 ?
                                                data.map((role, index) => (
                                                    <tr key={role.id}>
                                                        <td className="whitespace-nowrap px-2 py-4">{meta.from + index}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">{role.name}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">{role.users_count}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            <div className='flex items-center gap-1 max-w-xs flex-wrap'>
                                                                {
                                                                    role.id == 1 ? (
                                                                        <div className='text-[0.7rem] text-white bg-cyan-400 dark:bg-cyan-500 px-1 py-0.5 inline-block font-medium'>All Privilages</div>
                                                                    ) : (
                                                                        role.permissions.map((item, index) => (
                                                                            <span className='text-[0.7rem] text-white bg-gray-400 dark:bg-gray-950 px-1 py-0.5 inline-block font-medium' key={index}>{item.name}</span>
                                                                        ))
                                                                    )
                                                                }

                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            <div className='flex items-center justify-end'>
                                                                {
                                                                    role.id == 1 ? (
                                                                        <>
                                                                            <DisableActionButton title="Permission">
                                                                                <BsShieldExclamation className='w-4 h-4 text-white flex-shrink-0' />
                                                                            </DisableActionButton>
                                                                            <div className='pl-2'></div>
                                                                            <DisableActionButton title="Hapus">
                                                                                <HiOutlineTrash className='w-4 h-4 text-white flex-shrink-0' />
                                                                            </DisableActionButton>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button onClick={() => setSelectedAssignPermission(role)} type="button" className="rounded bg-green-400 dark:bg-green-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#4ade80] transition duration-150 ease-in-out dark:hover:bg-green-600 hover:bg-green-500 hover:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] focus:bg-green-500 focus:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.3),0_4px_18px_0_rgba(34,197,94,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(34,197,94,0.2),0_4px_18px_0_rgba(34,197,94,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                                <BsShieldExclamation className='w-4 h-4 text-white flex-shrink-0' />
                                                                                <span className='text-[0.6rem] leading-[0]'>Permission</span>
                                                                            </button>
                                                                            <div className='pl-2'></div>
                                                                            <button onClick={() => setSelectedDeleteRole(role)} type="button" className="rounded bg-rose-400 dark:bg-rose-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#FB8F9F] transition duration-150 ease-in-out dark:hover:bg-rose-600 hover:bg-rose-500 hover:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.3),0_4px_18px_0_rgba(251,143,159,0.2)] focus:bg-rose-500 focus:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.3),0_4px_18px_0_rgba(251,143,159,0.2)] focus:outline-none focus:ring-0 active:bg-rose-500 active:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.3),0_4px_18px_0_rgba(251,143,159,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,143,159,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.2),0_4px_18px_0_rgba(251,143,159,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.2),0_4px_18px_0_rgba(251,143,159,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,143,159,0.2),0_4px_18px_0_rgba(251,143,159,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                                <HiOutlineTrash className='w-4 h-4 text-white flex-shrink-0' />
                                                                                <span className='text-[0.6rem] leading-[0]'>Hapus</span>
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
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
