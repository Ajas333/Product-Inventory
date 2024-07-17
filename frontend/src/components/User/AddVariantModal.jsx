import React, { useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { AddVariantSchema,initialValue } from '../../Validation/VariantSchema';
import { userAxios } from '../../utils/Servive';
import userApi from '../../api/userApi';
import { toast } from 'react-toastify';


function AddVariantModal({setAction,action, setIsOpen, productid}) {
  
    // ref for closing modal
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setIsOpen(false);
        }
    };

    // submit the variant data
    const handleSubmit = async(values)=>{
        console.log(values)
        const formData = new FormData();
        formData.append('size',parseInt(values.size));
        formData.append('color',values.color);
        formData.append('Stock',values.Stock);
        formData.append('product',productid);
        await userAxios.post(userApi.addVariant,formData)
        .then(response=>{
            console.log(response)
            if(response.status==201){
                setAction(!action)
                setIsOpen(false)
                toast.success('Variant Added!',{
                    position: "top-center",
                  });
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
            <div className='mt-10 flex flex-col text-white w-5/6 md:w-3/6 h-5/6'>
                <button className='place-self-end' onClick={() => setIsOpen(false)}><IoMdClose size={30} /></button>
                <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4 max-h-full overflow-auto'>
                    <div className='flex justify-center'>
                        <Formik 
                        initialValues={initialValue}
                        validationSchema={AddVariantSchema}
                        onSubmit={handleSubmit}
                        >
                            {({isSubmitting})=>(
                                <Form>
                                   <div className='flex gap-2'>
                                        <div className='flex flex-col'>
                                            <Field
                                            as ='select'
                                            name = 'size'
                                            className="flex h-10 w-32 text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                            <option value="" disabled>Select size</option>
                                            {[...Array(10).keys()].map((num) => (
                                                <option key={num + 1} value={num + 1}>
                                                    {num + 1}
                                                </option>
                                            ))}
                                            </Field>
                                            <ErrorMessage name='size' component='div' className='text-red-500 text-sm mb-2' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Field
                                            as ='select'
                                            name = 'color'
                                            className="flex w-32 text-black h-10  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                            <option value="" disabled>Select color</option>
                                            {['Red', 'Blue', 'Green', 'Black'].map((color) => (
                                                <option key={color} value={color}>
                                                    {color}
                                                </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name='color' component='div' className='text-red-500 text-sm mb-2' />
                                        </div>
                                        <div className='flex flex-col'>
                                        <Field
                                        type="number"
                                        name = 'Stock'
                                        placeholder='Stock'
                                        className="flex text-black h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <ErrorMessage name='Stock' component='div' className='text-red-500 text-sm mb-2' />
                                        </div>

                                   </div>
                                   <div className='flex justify-center mt-4'>
                                    <button type='submit' className=' bg-blue-600 px-2 py-1 rounded-full hover:scale-105 hover:bg-blue-700 font-bold'>submit</button>
                                   </div>
                                                
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVariantModal;
