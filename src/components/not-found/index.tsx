import React, { type FC } from 'react'
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
  return (
    <div className='card p-10 text-center'>
        <div className='flex flex-col items-center'>
            <div className='text-6xl mb-4'>🔎</div>
            <h1 className='text-2xl font-bold text-error mb-3'>....Note Not Found....</h1>
            <p className='text-secondary mb-6'>The note you are looking for does not exist or has been moved</p>
            <Link to="/" className='text-primary hover:text-primary-hover transition'>Return to Home Page</Link>
        </div>
    </div>
  )
}

export default NotFound