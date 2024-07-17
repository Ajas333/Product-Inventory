import React from 'react'
import ProductTable from '../components/User/ProductTable'


function UserHome() {
  return (
    <div className='pt-14 pl-56'>
      <div className=''>
       <div className='flex justify-between'>
        <p className='mt-2 ml-2 text-gray-700 font-bold text-xl'>All Products</p>
        
       </div>
       <div className='bg-gray-100 mx-2 my-4 p-2 rounded-md min-h-[32rem] '>
        <ProductTable/>
       </div>
      </div>
    </div>
  )
}

export default UserHome
