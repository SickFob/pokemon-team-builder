import Link from 'next/link'
import React, { ReactNode } from 'react'

interface TeamListLayoutProps {
  children?: ReactNode
}

const TeamListLayout = ({ children }: TeamListLayoutProps) => {
  return (
    <div>
      <div className='mb-10'>
        <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" href='/team/create'>
          Create Team
        </Link>

      </div>
      {children}
    </div>
  )
}

export default TeamListLayout