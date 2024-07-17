import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserSidebar from './components/User/UserSidebar'
import UserHeader from './components/User/UserHeader'
import UserHome from './pages/UserHome'
import AddProduct from './pages/AddProduct'
import ProductView from './pages/ProductView'

function ProductWrapper() {
  return (
    <div>
        <UserHeader/>
        <UserSidebar/>
      <Routes>
      <Route path='/' element={<UserHome/>}></Route>
        <Route path='/add_product' element={<AddProduct/>}></Route>
        <Route path='/product_view/:id' element={<ProductView/>}></Route>
      </Routes>
    </div>
  )
}

export default ProductWrapper
