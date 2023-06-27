import React from 'react';
import classNames from 'classnames';
import { Link } from '@inertiajs/react';
import {HiArrowSmallLeft, HiArrowSmallRight} from 'react-icons/hi2'

const PageLink = ({ active, label, url }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'py-1.5 px-3',
      'text-sm text-gray-500 dark:text-gray-300',
      'outline-none',
      'border-t-2'
    ],
    {
      'border-emerald-400': active
    },{
      'hover:border-gray-300 dark:hover:border-emerald-400 border-transparent': !active
    }
  );
  return (
    <Link className={className} href={url}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </Link>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  const className = classNames(
    'mr-1 mb-1 px-3 py-1.5 text-sm text-gray-400'
  );
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: label }} />
  );
};

export default ({ links = [] }) => {
  // dont render, if there's only 1 page (previous, 1, next)
  if (links.length === 3) return null;
  return (
    <div className='flex items-center justify-between mt-6'>
      {
        links[0].url === null ? (
          <button className=''disabled>
            <HiArrowSmallLeft className='w-5 h-5 text-gray-400 dark:text-gray-500'/>
          </button>
        ) : (
          <Link href={links[0].url} className='mr-1 mb-1 py-1.5 px-3 text-sm outline-none border-t-2 dark:hover:border-emerald-400 hover:border-gray-300 border-transparent'>
            <HiArrowSmallLeft className='w-5 h-5 text-gray-600 dark:text-gray-200'/>
          </Link>
        )
      }
      <div className="flex flex-wrap">
        {links.map(({ active, label, url }, index) => {
          if(index !== 0 && index !== links.length-1){
            return url === null ? (
              <PageInactive key={label} label={label} />
            ) : (
              <PageLink key={label} label={label} active={active} url={url} />
            );
          }
        })}
      </div>
      {
        links[links.length-1].url === null ? (
          <button className=''disabled>
            <HiArrowSmallRight className='w-5 h-5 text-gray-400 dark:text-gray-500'/>
          </button>
        ) : (
          <Link href={links[links.length-1].url} className='mr-1 mb-1 py-1.5 px-3 text-sm outline-none border-t-2 hover:border-gray-300 dark:hover:border-emerald-400 border-transparent'>
            <HiArrowSmallRight className='w-5 h-5 text-gray-600 dark:text-gray-200'/>
          </Link>
        )
      }
    </div>
  );
};
