import React,{useState} from 'react'
import * as Yup from 'yup';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import { userAxios } from '../utils/Servive';
import userApi from '../api/userApi';

const initialvalue = {
    username:"",
    password:"",
}

const LoginSchema =Yup.object().shape({
    username : Yup.string().required('username is required'),
    password:Yup.string().required("password required")
})

function LoginSignup() {
    const handleSubmt = async(values)=>{
        console.log(values)
        const formData = new FormData()
        formData.append("username",values.username);
        formData.append("password",values.password);
        await userAxios.post(userApi.userLogin,formData)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <Formik 
          initialValues={initialvalue}
          validationSchema={LoginSchema}
          onSubmit={handleSubmt}>
            {({errors,isSubmitting})=>(
            <Form>
                <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
                    Email Address
                </label>
                <Field
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username" type="text" placeholder="Enter your username" />
                    <ErrorMessage name='username' component='div' className='text-red-500 text-sm mb-2' />

                </div>
                <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                    Password
                </label>
                <Field
                    className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="password" type="password" placeholder="Enter your password" />
                    <ErrorMessage name='password' component='div' className='text-red-500 text-sm mb-2' />

                <a className="text-gray-600 hover:text-gray-800" href="#">Forgot your password?</a>
                </div>
                <div className="mb-6">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"  disabled={isSubmitting}>
                    Login
                </button>
                </div>
            </Form>

            )}

          </Formik>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
