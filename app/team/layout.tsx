import React, { ReactNode } from 'react'
import Breadcrumbs from '../components/Breadcrumb'

interface Props {
  children?: ReactNode
}

const TeamLayout = ({ children }: Props) => {

  return (
    <>
      <div className='p-8 container'>
        <Breadcrumbs />
        {children}
      </div>
    </>
  )
}

export default TeamLayout