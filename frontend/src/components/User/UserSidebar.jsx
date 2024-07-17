import React from 'react'
import { Link } from 'react-router-dom'

function UserSidebar() {
  return (
    <div className='h-screen w-56 bg-blue-200 fixed pt-20'>
        <div className='px-5'>
            <div className=' flex flex-col gap-2'>
                <Link to={''}>
                <button className='w-full bg-gray-50 hover:bg-gray-100 rounded-full px-3 py-1 font-medium text-gray-800 hover:scale-105'>
                    Products
                </button>
                </Link>
                <Link to={'/add_product'}>
                <button className='w-full bg-gray-50 hover:bg-gray-100 rounded-full px-3 py-1 font-medium text-gray-800 hover:scale-105'>
                    Add Product
                </button>
                </Link>
              
            </div>
        </div>
    </div>
  )
}

export default UserSidebar
