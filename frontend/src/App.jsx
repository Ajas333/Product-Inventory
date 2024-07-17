import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserHome from './pages/UserHome'
import UserHeader from './components/User/UserHeader'
import UserSidebar from './components/User/UserSidebar'
import AddProduct from './pages/AddProduct'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProductView from './pages/ProductView'
// import LoginSignup from './pages/LoginSignup'

import ProductWrapper from './ProductWrapper'
import LoginSignup from './pages/LoginSignup'



function App() {
  

  return (
    <>
     <BrowserRouter>
     <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition: Bounce
          />
     
      <Routes>
        <Route path='/*'element={<ProductWrapper/>}></Route>
        {/* <Route path='/login' element={<LoginSignup/>}></Route> */}
        {/* <Route path='/login' element={<LoginSignup/>} ></Route> */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
