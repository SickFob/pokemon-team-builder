'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import StringUtils from '../utils/StringUtils';

const Breadcrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);
  const currentPage = pathNames[pathNames.length - 1];

  return (
    <nav className="flex mb-10" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {
          currentPage === 'list'
            ? (
              <li aria-current="page" >
                <div className="flex items-center">
                  <svg className="w-3 h-3 me-2.5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">Team List</span>
                </div>
              </li>
            )
            : (
              <>
                <li className="inline-flex items-center">
                  <Link href='/team/list' className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                    Team List
                  </Link>
                </li>
                <li aria-current="page" >
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{StringUtils.initCap(currentPage)}</span>
                  </div>
                </li>
              </>
            )
        }
      </ol>
    </nav>
  );
}

export default Breadcrumbs