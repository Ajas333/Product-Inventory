import React,{useRef, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { userAxios } from '../../utils/Servive';
import userApi from '../../api/userApi';
import { toast } from 'react-toastify';



function EditVariantModal({setAction,action,variantid,Stock,setShowModal}) {
    const [value,setValue] = useState(Stock)
    
    // ref for closing modal
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    // handle inputs from the input field 
    const handleInputChange = (e) => {
        setValue(e.target.value); 
    };  

    // submit the changed 
    const handleChange = async ()=>{
        console.log(value)
        await userAxios.put(userApi.editVariant(variantid),{Stock:value})
        .then(response=>{
            console.log(response)
            if(response.status == 200){
                setShowModal(false)
                setAction(!action)
                toast.success('Stock Edited!',{
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
            <div className='mt-10 flex flex-col text-white w-5/6 md:w-1/6 h-5/6'>
                <button className='place-self-end' onClick={() => setShowModal(false)}><IoMdClose size={30} /></button>
                <div className='bg-indigo-200 rounded-xl px-10 py-5 items-center mx-4 max-h-full overflow-auto'>
                    <div className='flex flex-col'>
                        <input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        name = 'Stock'
                        placeholder='Stock'
                        className="flex text-black h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className='flex justify-center mt-2'>
                        <button onClick={handleChange} className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-full hover:scale-105'>Change</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default EditVariantModal
