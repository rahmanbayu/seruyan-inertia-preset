import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import pickBy from 'lodash/pickBy';
import Pagination from '@/Components/Actions/Pagination';
import DisableActionButton from '@/Components/Actions/DisableActionButton';
import { HiOutlineTrash } from 'react-icons/hi/index.esm';
import { BsShieldExclamation } from 'react-icons/bs/index.esm';
import DeletePermission from './DeletePermission';

export default function index(props) {
    const {meta, data} = props.permissions;

    const [filter, setFilter] = useState({
        search: props.filters.search || '',
        sort: props.filters.sort || '',
        per_page: props.filters.per_page || ''
    });

    const [value] = useDebounce(filter.search, 300);
    const [sortDebounced] = useDebounce(filter.sort, 300);

    const prevFilter = usePrevious(filter);

    const onChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
    }

    const resetFilter = ()=>{
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
      <div className='dark:bg-gray-900 bg-white rounded-lg p-5 shadow-lg'>
          {/* header */}
        <div className='flex flex-col md:flex-row md:items-center md:space-y-0 space-y-4 justify-between'>
          <div>
            <h1 className='font-medium text-gray-700 dark:text-gray-200'>Permission</h1>
            <p className="mt-1 text-xs text-gray-400">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex md:flex-row flex-col-reverse md:items-center gap-x-2 md:gap-y-0 gap-y-4">
            <div className='md:w-auto w-full'>
              <input type="text" id='search' name='search'  placeholder='Search . . .' value={filter.search} onChange={onChange} className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 md:w-auto w-full' />
            </div>
            <select name="per_page" id="per_page" value={filter.per_page} onChange={onChange}  className='outline-none transition-all duration-150 text-sm px-2 py-1.5 placeholder:text-sm rounded-md border border-gray-300 hover:border-emerald-300 focus:border-emerald-400 text-gray-800 bg-transparent dark:bg-gray-950 dark:border-gray-950 dark:focus:border-emerald-400 dark:placeholder:text-gray-400 dark:text-gray-100 md:w-auto w-full'>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        {/* table content */}
        <div className="flex flex-col  overflow-hidden mt-5">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                <tr>
                                    <th scope="col" className="px-2 py-4">#</th>
                                    <th scope="col" className="px-2 py-4">
                                        <span className='cursor-pointer'>Nama</span>
                                    </th>
                                    <th scope="col" className="px-2 py-4">
                                        <span className='cursor-pointer'>User</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-sm text-gray-600 dark:text-gray-400'>
                                {
                                    data && data.length != 0 ?
                                    data.map((permission, index) => (
                                        <tr key={permission.id}>
                                            <td className="whitespace-nowrap px-2 py-4">{meta.from + index}</td>
                                            <td className="whitespace-nowrap px-2 py-4">{permission.name}</td>
                                            <td className="whitespace-nowrap px-2 py-4">{permission.users_count}</td>
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
