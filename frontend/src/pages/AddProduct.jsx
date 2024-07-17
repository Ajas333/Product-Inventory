import React, { useState,useEffect } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { userAxios } from '../utils/Servive';
import userApi from '../api/userApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValue,AddProductSchema } from '../Validation/AddProductSchema';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [rows, setRows] = useState([{ size: '', color: '', stock: '' }]);
  const [image, setImage] = useState(null);
  const [totalStock, setTotalStock] = useState(0);
  const navigate = useNavigate();

  // submit product data
  const handleSubmit = async(values)=>{
    var product_variants = [];
    rows.forEach((val) => {
      console.log("ayyoooo", val);
      product_variants.push({
        size: parseInt(val.size),
        color: val.color,
        Stock: parseInt(val.stock)
      });
    });
   var product_blob = new Blob([JSON.stringify(product_variants)],{type:'application/json'});
   const formData = new FormData();
   formData.append("ProductID",values.product_id),
   formData.append("ProductCode",values.product_code),
   formData.append("ProductName",values.product_name),
   formData.append("HSNCode",values.hsncode),
   formData.append("ProductImage",image),
   formData.append('product_variants', product_blob, 'data.json');
   formData.append('Active',true)
   
   const response = await userAxios.post(userApi.addProduct,formData)
   console.log("zxuci7v8yb9unoxcvyb",response)
   if(response.status == 201){
      toast.success('product Added!',{
      position: "top-center",
    });
   }
   navigate('/')
 }
  
// calculate total stock
  useEffect(() => {
    const total = rows.reduce((acc, row) => acc + Number(row.stock || 0), 0);
    setTotalStock(total);
  }, [rows]);

// add rows for add variant
  const handleAddRow = () => {
    setRows([...rows, { size: '', color: '', stock: '' }]);
  };

  // handle variant value
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

// handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // remove immage
  const handleRemoveImage = () => {
    setImage(null);
   
  };

  // for removing row
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };
 

  return (
    <div className='pt-14 pl-56 '>
      <div>
        <div>
          <span className=' ml-2 text-2xl font-bold text-gray-700'>Add Product</span>
        </div>
        <div className=' w-full h-min-[32rem] flex gap-2 justify-center mt-3'>
          <div className='w-3/6 bg-gray-100 rounded-md p-3'>
          <Formik
                initialValues={initialValue}
                validationSchema={AddProductSchema}
                onSubmit={handleSubmit}>
                {({errors,touched,isSubmitting})=>(
                    <Form>
                        <div className=' grid grid-cols-2 gap-3'>
                        <div className=''>
                            <label
                            className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >Product Id</label>
                            <Field placeholder="" type="number" name='product_id'
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                             <ErrorMessage name='product_id' component='div' className='text-red-500 text-sm mb-2' />
                        </div>
                        <div className=''>
                            <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >Product Code</label>
                            <Field placeholder="" type="text" name='product_code'
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                             <ErrorMessage name='product_code' component='div' className='text-red-500 text-sm mb-2' />

                        </div>
                        </div>
                        <div className=' grid grid-cols-2 gap-3'>
                        <div className=''>
                            <label
                            className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >Product Name</label>
                            <Field placeholder="" type="text" name='product_name'
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                             <ErrorMessage name='product_name' component='div' className='text-red-500 text-sm mb-2' />

                        </div>
                        <div className=''>
                            <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >HSN Code</label>
                            <Field placeholder="" type="text" name='hsncode'
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                             <ErrorMessage name='hsncode' component='div' className='text-red-500 text-sm mb-2' />

                        </div>
                        </div>
                        <div>
                            <label
                                className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >Product Images</label>
                            
                            <input
                                className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
                                type="file"
                                id="picture"
                                name="picture"
                                accept="image/jpeg, image/png, image/gif"
                                onChange={handleImageChange}
                                />
                             {/* <ErrorMessage name='picture' component='div' className='text-red-500 text-sm mb-2' /> */}

                        </div>
                        <div className='mt-3'>
                            <p>Total Stock : <span>{totalStock}</span></p>
                        </div>
                        <div className='mt-2 '>
                        <div className="p-5 relative">
                            <table className="w-full mb-4">
                            <thead>
                                <tr className='flex'>
                                <td className='w-1/4 mr-2 text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Size</td>
                                <td className='w-1/3 mr-2 text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Colour</td>
                                <td className='w-1/3 mr-2 text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Stock</td>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                <tr key={index} className="flex items-center">
                                    <td className="w-1/4 mr-2">
                                    <select
                                       
                                        value={row.size}
                                        onChange={(e) => handleChange(index, 'size', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="" disabled>Select size</option>
                                        {[...Array(10).keys()].map((num) => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                        ))}
                                    </select>
                                    </td>
                                    <td className="w-1/3 mr-2">
                                    <select
                                        value={row.color}
                                        onChange={(e) => handleChange(index, 'color', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                                    >
                                        <option value="" disabled>Select color</option>
                                        {['Red', 'Blue', 'Green', 'Black'].map((color) => (
                                        <option key={color} value={color}>
                                            {color}
                                        </option>
                                        ))}
                                    </select>
                                    </td>
                                    <td className="w-1/3 flex items-center">
                                    <input
                                        type="number"
                                        placeholder='type here'
                                        value={row.stock}
                                        onChange={(e) => handleChange(index, 'stock', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                                    />
                                    
                                    </td>
                                    <td>
                                    {index > 0 && (
                                        <div
                                        onClick={() => handleRemoveRow(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                        <CiCircleRemove />
                                        </div>
                                    )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                            <div
                            onClick={handleAddRow}
                            className="bg-blue-500 text-white px-2 py-0.5 rounded-md hover:bg-blue-700 absolute bottom--1 right-5">
                            Add Varient
                            </div>
                        </div>
                        </div>
                        <div>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                        </div>
                    </Form>
                )}
          </Formik>
          </div>
          <div className='w-1/6 flex flex-col gap-2 rounded-md'>
          <div className='bg-gray-100 min-h-[11rem] rounded-md  py-3'>
            <p className='text-lg font-semibold text-center text-gray-600 mb-3'>Product Images</p>
                 {!image ? (
                    <p className='text-center  text-gray-500'>No images selected</p>
                ) : (
                   
                    <div className='flex mb-1 px-3'>
                        <img src={URL.createObjectURL(image)} className='w-24 h-24 object-cover ' alt={`product `} />
                        <button onClick={handleRemoveImage} className='text-red-600 rounded-full h-6 hover:text-red-700'>
                        <CiCircleRemove size={20} />
                        </button>
                    </div>  
                  
                )}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
