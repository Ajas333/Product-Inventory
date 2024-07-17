import React from 'react'

function AdminHeader() {
  return (
    <div className='h-14 w-screen bg-blue-200 fixed z-10 shadow-md flex items-center'>
      <div className='flex ml-2 items-end'>
        <p  className='text-2xl font-extrabold font-serif text-blue-800'>Product <span className='text-red-500'>Inventory</span></p>
        
      </div>
    </div>
  )
}

export default AdminHeader
