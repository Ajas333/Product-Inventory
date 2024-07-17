import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import userApi from '../api/userApi';
import { userAxios } from '../utils/Servive';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import AddVariantModal from '../components/User/AddVariantModal';
import EditVariantModal from '../components/User/EditVariantModal';
const userBaseURL = import.meta.env.VITE_API_BASEURL


function ProductView() {
    const { id } = useParams();
    const [productData,setProductData] = useState([])
    const [variants,setVariants] = useState([])
    const [action,setAction] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [stock,setStock] =useState()
    const [variantid,setVariantId] =useState()
   

    // fetch product data 
    useEffect(()=>{
        userAxios.get(userApi.productview(id))
        .then(response=>{
            console.log("productview......",response)
            setProductData(response.data)
            setVariants(response.data.variants)
        })
        .catch(error=>{
            console.error("something went wrong...!",error);
        })
    },[id,action])

    // handle delete variant
    const handleDelete = async(id,index)=>{
     
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         userAxios.delete(userApi.deleteVariant(id))
          .then(response =>{
            console.log(response)
            if (response.status === 204) { 
              toast.success('Variant deleted!',{
                position: "top-center",
              });
              setAction(!action)
              console.log('Variant deleted successfully');
            } else {
              console.error('Failed to delete the variant');
              toast.warning("Can't delete right now!",{
                position: "top-center",
              });
            }
          })
          .catch(error=>{
            console.log(error)
          })
        }
      });
       
    }

    // for edit the stock
    const handleEdit = (Stock,id)=>{
      setStock(Stock)
      setVariantId(id)
      setShowModal(true)
    }

    const formatDate = (datetime) => {
      const date = new Date(datetime);
      return date.toLocaleDateString();
  };

  return (
    <div className='pt-14 pl-56'>
      <div className='flex'>
        <div className='p-2 w-2/5'>
            <div className='bg-gradient-to-r from-slate-50 via-gray-100 to-slate-50 rounded-md p-2 min-h-[32rem] relative'>
              <div>
                <p className='text-xl font-bold text-blue-900'>Product Details</p>
              </div>
              <div className='absolute top-0 right-0 p-3'>
                  {productData.Active === true ?(
                    <p className='bg-green-500 rounded-lg px-2 py-1 font-bold text-gray-50'>Active</p>
                  ):(
                    <p className='bg-red-500 rounded-lg px-2 py-1 font-bold text-gray-50'>Not Active</p>
                  )}
              </div>

              <div>
                <div className='grid grid-cols-1 gap-2 mt-4'>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>Product name: <span className='text-sm font-bold text-red-600 '>{productData.ProductName}</span> </p>
                  </div>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>Product id: <span className='text-sm font-bold text-red-600 '>{productData.ProductID}</span></p>
                  </div>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>Product code: <span className='text-sm font-bold text-red-600 '>{productData.ProductCode}</span></p>
                  </div>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>HSN code: <span className='text-sm font-bold text-red-600 '>{productData.HSNCode}</span></p>
                  </div>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>Total stock: <span className='text-sm font-bold text-red-600 bg-yellow-200 px-2 py-1 rounded-lg'>{parseInt(productData.TotalStock)}</span></p>
                  </div>
                  <div className=''>
                    <p className='text-base font-medium text-gray-800'>Created at: <span className='text-sm font-bold text-red-600 '>{formatDate(productData.CreatedDate)}</span></p>
                  </div>
                  <div className='flex justify-center'>
                    <img src={`${userBaseURL}${productData.ProductImage}`} alt="Product image" className='h-60' />
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='p-2 w-3/5'>
            <div className='bg-gradient-to-r from-slate-50 via-gray-100 to-slate-50 rounded-md p-2 min-h-[32rem]'>
            <div className='flex justify-between'>
                <p className='text-xl font-bold text-blue-900'>Product Variants</p>
                <div className='pr-2'>
                  <button onClick={()=>setIsOpen(true)} className='bg-blue-600 text-white px-2 py-1 rounded-full hover:scale-105 '>Add variant</button>
                </div>
                {isOpen && <AddVariantModal setAction={setAction} action={action} isOpen={isOpen} setIsOpen={setIsOpen} productid={productData.id} />}
                {showModal && <EditVariantModal setAction={setAction} action={action} variantid={variantid} Stock={stock} setShowModal={setShowModal}  />}
              </div>
                <table className='min-w-full mt-4'>
                  <thead className='bg-blue-100 '>
                    <tr>
                      <td className='py-2 px-4 border-b font-bold '>Size</td>
                      <td className='py-2 px-4 border-b font-bold '>Colour</td>
                      <td className='py-2 px-4 border-b font-bold '>Stock</td>
                      <td className='py-2 px-4 border-b font-bold text-center'>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.length >0 ? (
                      variants.map((variant,idx)=>(
                        <tr key={idx}>
                          <td className='py-2 px-4 border'>{variant.size}</td>
                          <td className='py-2 px-4 border'>{variant.color}</td>
                          <td className='py-2 px-4 border'>{variant.Stock}</td>
                          <td className='py-2 pl-2 border flex justify-around'>
                            <button onClick={()=>handleEdit(variant.Stock,variant.id)} className='bg-green-400 rounded-full px-2 py-0.5 hover:bg-green-500'>Edit stock</button> 
                            <button onClick={()=>handleDelete(variant.id,idx)} className='bg-red-400 rounded-full px-2 py-0.5 hover:bg-red-500'>Delete</button>
                          </td>
                        </tr>
                      ))

                    ):(
                      <tr>
                        <td colSpan="6" className="py-2 px-4 border-b text-center">No Variant available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
