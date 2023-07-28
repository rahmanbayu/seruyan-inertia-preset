import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Head, Link, router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';
import Pagination from '@/Components/Actions/Pagination';
import DisableActionButton from '@/Components/Actions/DisableActionButton';
import { HiOutlineTrash } from 'react-icons/hi';
import { BsFiletypeCsv, BsFiletypePdf, BsFiletypeXlsx, BsShieldExclamation } from 'react-icons/bs';
import { HiOutlineEye } from 'react-icons/hi2';
import { IoReload } from 'react-icons/io5';
import { LuFileJson2 } from 'react-icons/lu';
import ShowLogProperties from './ShowLogProperties';

export default function index(props) {
    const { meta, data } = props.logs;
    const [filter, setFilter] = useState({
        search: props.filters.search || '',
        sort: props.filters.sort || '',
        per_page: props.filters.per_page || '',
        user: props.filters.user || '',
        event: props.filters.event || '',
        model: props.filters.model || '',
        start_date: props.filters.start_date || '',
        end_date: props.filters.end_date || '',
    });
    const [selectedLogProperties, setSelectedLogProperties] = useState();

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
            per_page: '',
            user: '',
            event: '',
            model: '',
            start_date: '',
            end_date: '',
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
    }, [sortDebounced, value, filter.per_page, filter.user, filter.event, filter.model, filter.start_date, filter.end_date,]);


    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Activity Log" />
            <ShowLogProperties selectedLogProperties={selectedLogProperties} setSelectedLogProperties={setSelectedLogProperties} />
            <div className='dark:bg-gray-900 bg-white rounded-lg p-5 shadow-lg'>
                {/* header */}
                <div className='flex flex-col md:flex-row md:items-center md:space-y-0 space-y-4 justify-between'>
                    <div>
                        <h1 className='font-medium text-gray-700 dark:text-gray-200'>Activity Log</h1>
                        <p className="mt-1 text-xs text-gray-400">Rekaman aktifitas user pada sistem.</p>
                    </div>
                </div>
                {/* filter */}

                <div className='mt-5'>
                    <div className='text-xs font-medium mb-2 text-gray-700 dark:text-gray-200'>Advance Filter:</div>
                    <div className="flex lg:flex-row flex-col lg:flex-wrap lg:items-center gap-x-2 lg:gap-y-2 gap-y-4">
                        <div className='lg:w-auto w-full'>
                            <input type="text" id='search' name='search' placeholder='Search . . .' value={filter.search} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 lg:w-auto w-full lg:max-w-[8rem]' />
                        </div>
                        <select name="per_page" id="per_page" value={filter.per_page} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 lg:w-auto w-full'>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                        </select>
                        <div className='relative'>
                            <select name="user" id="user" value={filter.user} onChange={onChange} className='peer outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 lg:w-auto w-full placeholder-transparent' placeholder='tes'>
                                <option value=""></option>
                                {
                                    props.users.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="user" className={`text-sm text-gray-500 absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-all duration-0 pointer-events-none ${filter.user != '' ? 'opacity-0' : ''}`}>User</label>
                        </div>
                        <div className='relative'>
                            <select name="event" id="event" value={filter.event} onChange={onChange} className='peer outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 lg:w-auto w-full placeholder-transparent' placeholder='tes'>
                                <option value=""></option>
                                <option value="created">Created</option>
                                <option value="updated">Updated</option>
                                <option value="deleted">Deleted</option>
                            </select>
                            <label htmlFor="event" className={`text-sm text-gray-500 absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-all duration-0 pointer-events-none ${filter.event != '' ? 'opacity-0' : ''}`}>Event</label>
                        </div>
                        <div className='relative'>
                            <select name="model" id="model" value={filter.model} onChange={onChange} className='peer outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 lg:w-auto w-full placeholder-transparent' placeholder='tes'>
                                <option value=""></option>
                                <option value="User">User</option>
                                <option value="Category">Category</option>
                                <option value="Kontrak">Kontrak</option>
                                <option value="Media">Media</option>
                                <option value="Permission">Permission</option>
                                <option value="Report">Report</option>
                                <option value="Role">Role</option>
                            </select>
                            <label htmlFor="model" className={`text-sm text-gray-500 absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-all duration-0 pointer-events-none ${filter.model != '' ? 'opacity-0' : ''}`}>Model</label>
                        </div>
                        <div className='relative'>
                            <select name="sort" id="sort" value={filter.sort} onChange={onChange} className='peer outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 w-full placeholder-transparent lg:max-w-[8rem]' placeholder='tes'>
                                <option value=""></option>
                                <option value="created-at-latest">Latest</option>
                                <option value="created-at-oldest">Oldest</option>
                            </select>
                            <label htmlFor="sort" className={`text-sm text-gray-500 absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-all duration-0 pointer-events-none ${filter.sort != '' ? 'opacity-0' : ''}`}>Sorting</label>
                        </div>
                        <div className='flex flex-row lg:items-center gap-x-2 lg:gap-y-0 gap-y-4'>
                            <input type="date" name='start_date' id="start_date" value={filter.start_date} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 w-full lg:max-w-[10rem] inline-block' />
                            <input type="date" name='end_date' id="end_date" value={filter.end_date} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 w-full lg:max-w-[10rem] inline-block' />
                        </div>
                        <button onClick={resetFilter} className='bg-amber-400 hover:bg-amber-500 transition-all duration-150 shadow hover:shadow-sm text-white p-2 rounded flex items-center justify-center'>
                            <IoReload className='w-4 h-4' />
                        </button>
                    </div>
                    {/* <div className='text-xs font-medium mb-2 text-gray-700 dark:text-gray-200 mt-3'>Export:</div>
                    <div className='flex items-center space-x-2'>
                        <a href={route('logs.export', { ...filter })} target='_blank' className='border border-gray-300 dark:border-gray-200 bg-transparent-400 hover:bg-transparent-500 transition-all duration-150 shadow hover:shadow-sm text-white p-2 rounded flex items-center justify-center space-x-2'>
                            <BsFiletypeXlsx className='w-4 h-4 text-gray-500 dark:text-gray-200' />
                            <div className='text-xs text-gray-500 dark:text-gray-200'>XLSX</div>
                        </a>
                    </div> */}
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
                                                <span className='cursor-pointer'>Penyebab</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4">
                                                <span className='cursor-pointer'>Event</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4">
                                                <span className='cursor-pointer'>Model</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4">
                                                <span className='cursor-pointer'>When</span>
                                            </th>
                                            <th scope="col" className="px-2 py-4 text-right">
                                                <span>Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm text-gray-600 dark:text-gray-400'>
                                        {
                                            data.length != 0 ?
                                                data.map((log, index) => (
                                                    <tr key={index}>
                                                        <td className="whitespace-nowrap px-2 py-4">{meta.from + index}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[12rem] truncate">{log.causer?.name}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[12rem] truncate">{log.event}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[12rem] truncate">{log.subject_type}</td>
                                                        <td className="whitespace-nowrap px-2 py-4 max-w-[12rem] truncate">{log.formatted_created_at}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">
                                                            <div className='flex items-center justify-end'>
                                                                <button onClick={() => setSelectedLogProperties(log.properties)} type="button" className="rounded bg-pink-400 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e879f9] transition duration-150 ease-in-out hover:bg-pink-500 hover:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.3),0_4px_18px_0_rgba(217,70,239,0.2)] focus:bg-pink-500 focus:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.3),0_4px_18px_0_rgba(217,70,239,0.2)] focus:outline-none focus:ring-0 active:bg-pink-500 active:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.3),0_4px_18px_0_rgba(217,70,239,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(217,70,239,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.2),0_4px_18px_0_rgba(217,70,239,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.2),0_4px_18px_0_rgba(217,70,239,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(217,70,239,0.2),0_4px_18px_0_rgba(217,70,239,0.1)] flex items-center space-x-1" data-te-ripple-init data-te-ripple-color="light">
                                                                    <div>
                                                                        <LuFileJson2 className='w-4 h-4 text-white flex-shrink-0' />
                                                                    </div>
                                                                    <span className='text-[0.6rem] leading-[0]'>Properties</span>
                                                                </button>
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
                <Pagination links={meta.links} />
            </div>
        </AuthenticatedLayout>
    )
}
