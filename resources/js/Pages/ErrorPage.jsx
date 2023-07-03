import React from 'react'

export default function ErrorPage({status}) {
  //  const title = {
  //   503: '503 Service Unavailable',
  //   500: '500 Server Error',
  //   404: '404 Page Not Found',
  //   403: '403 Forbidden',
  // }[status]
   const title = {
    503: '503',
    500: '500',
    404: '404',
    403: '403',
  }[status]

  // const description = {
  //   503: 'Sorry, we are doing some maintenance. Please check back soon.',
  //   500: 'Whoops, something went wrong on our servers.',
  //   404: 'Sorry, the page you are looking for could not be found.',
  //   403: 'Sorry, you are forbidden from accessing this page.',
  // }[status]

   const description = {
    503: 'Service Unavailable',
    500: 'Server Error',
    404: 'Page Not Found',
    403: 'Forbidden',
  }[status]
  return (
    <div className='h-screen overflow-hidden flex items-center justify-center text-center'>
      {/* <div>
        <div className='lg:text-[5rem] text-gray-900 font-rampantone'>{title}</div>
        <div className='mt-2 text-gray-600'>{description}</div>
      </div> */}

      <div className='flex items-center justify-center space-x-3 md:space-x-5'>
        <div className='text-xl md:text-3xl font-semibold text-black'>{title}</div>
        <div className='h-8 md:h-[3rem] bg-black w-[2px] transform'></div>
        <div className='text-gray-800 text-sm'>{description}</div>
      </div>
    </div>
  )
}
