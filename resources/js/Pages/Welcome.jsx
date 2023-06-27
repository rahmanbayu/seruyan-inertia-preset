import Guest from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {RiEyeCloseLine, RiEyeFill} from 'react-icons/ri'

export default function Welcome({logo}) {
    const [viewPassword, setViewPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Welcome" />
            <div className='h-screen w-full md:h-[85vh] lg:w-[70%] md:grid grid-cols-2 relative z-10 shadow-xl overflow-hidden rounded-2xl'>
                <div className='h-full md:h-auto dark:bg-gray-800 bg-white dark:bg-opacity-60 md:rounded-l-2xl overflow-hidden flex items-center justify-center flex-col p-10'>
                    <div className='flex items-center justify-center'>
                        <img src={logo} alt="Logo kabupaten seruyan" className='h-20' />
                    </div>
                    <div className='py-8 text-center text-gray-600 dark:text-white font-bold'>
                        <span className='md:block hidden text-sm'>Masuk ke halaman dashboard!</span>
                        <span className='md:hidden text-lg'>Template Laravel Inertia</span>
                    </div>

                    <div className='w-full'>
                        <form onSubmit={submit} method='POST'>
                            <div className='relative'>
                                <input value={data.email} onChange={(e) => setData('email', e.target.value)} name='email' id='email' autoCorrect="off" autoComplete="off" placeholder='email' type="text" className='peer w-full h-10 border-b-2 dark:border-gray-600 dark:focus:border-emerald-400 border-gray-300 text-gray-800 focus:border-emerald-300 placeholder-transparent outline-none text-sm bg-transparent border-t-0 border-x-0 shadow-none transition-all duration-150 dark:text-white' />
                                <label htmlFor="email" className='absolute left-0 -top-3.5 text-gray-700 text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-700 transition-all duration-150 dark:peer-placeholder-shown:text-gray-400 dark:peer-focus:text-white dark:text-gray-200'>Email Address</label>
                                {errors.email && <div className='mt-1 text-sm text-rose-500'>{errors.email}</div>}
                            </div>
                            <div className=' mt-10'>
                                <div className='relative'>
                                    <input value={data.password} onChange={(e) => setData('password', e.target.value)} name='password' id='password' autoCorrect="off" autoComplete="off" placeholder='Password' type={!viewPassword ? 'password' : 'text'} className='peer w-full h-10 border-b-2 dark:border-gray-600 dark:focus:border-emerald-400 border-gray-300 text-gray-800 focus:border-emerald-300 placeholder-transparent outline-none text-sm bg-transparent border-t-0 border-x-0 shadow-none transition-all duration-150 dark:text-white' />
                                    <label htmlFor="password" className='absolute left-0 -top-3.5 text-gray-700 text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-700 transition-all duration-150 dark:peer-placeholder-shown:text-gray-400 dark:peer-focus:text-white dark:text-gray-200'>Password</label>
                                    <button onClick={() => setViewPassword(prev => prev = ! prev)} type='button' className='flex items-center justify-center h-10 px-3 absolute top-1/2 right-0 z-10 transform -translate-y-1/2 border-b-2 border-gray-300 dark:border-gray-600 dark:peer-focus:border-emerald-400 peer-focus:border-emerald-300 transition-all duration-150 outline-none ring-0 shadow-none bg-transparent'>
                                        {
                                            viewPassword ? (
                                                <RiEyeFill className="w-5 h-5 text-gray-400" />
                                                ):(
                                                <RiEyeCloseLine className="w-5 h-5 text-gray-400"/>
                                            )
                                        }
                                    </button>
                                </div>
                                {errors.password && <div className='mt-1 text-sm text-rose-500'>{errors.password}</div>}
                            </div>
                            <div class="flex items-center mt-7">
                                <input id="remember" type="checkbox" value={data.remember} class="w-4 h-4 text-emerald-600 bg-gray-100 border-transparent rounded" />
                                <label for="remember" class="ml-2 text-sm font-light dark:text-gray-100 text-gray-500">Remember Me</label>
                            </div>
                            <div className='mt-10'>
                                <button disabled={processing} className='block w-full text-center h-10 bg-emerald-400 hover:bg-emerald-500 transition-all duration-150 hover:shadow-lg shadow text-white text-sm'>
                                    {
                                            processing ? (
                                                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                                <circle cx={50} cy={50} fill="none" stroke="#ffffff" strokeWidth={11} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
                                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.1363636363636365s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                                </circle>
                                                </svg>
                                            ):(
                                                <span>Login</span>
                                            )
                                        }
                                </button>
                                {/* <button className='block w-full text-center h-10 bg-emerald-400 hover:bg-emerald-500 transition-all duration-150 hover:shadow-lg shadow text-white text-sm'>Login</button> */}
                                <div className='text-xs mt-5 px-4 text-gray-400 text-center md:hidden'>Dikelola Oleh DISKOMINFOSANDI Kabupaten Seruyan.</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='bg-gradient-to-br from-emerald-400 to-sky-400 via-emerald-500 dark:from-emerald-400/80 dark:via-emerald-300/60 dark:to-sky-400/50 md:flex flex-col justify-center  hidden rounded-r-2xl p-10'>
                    <h1 className='text-white font-bold text-2xl'>Template Laravel Inertia</h1>
                    <p className='text-white mt-4'>Dikelola Oleh Dinas KOMINFOSANDI Kabupaten Seruyan.</p>
                </div>
            </div>
        </Guest>
    );
}
