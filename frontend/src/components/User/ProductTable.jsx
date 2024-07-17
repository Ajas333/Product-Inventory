import React,{useState,useEffect} from 'react'
import { userAxios } from '../../utils/Servive'
import userApi from '../../api/userApi'
import { Link } from 'react-router-dom'


function ProductTable() {
    const [products,setProducts] = useState([])
    const [filtered,setFiltered] = useState([])

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber)
      
    }

    // fetch data from backend
    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const response = await userAxios.get(userApi.listProduct)
                console.log(response)
                if(response.status == 200){
                    setProducts(response.data)
                    setFiltered(response.data)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        fetchProducts()
    },[])
    console.log(products)

    // filter active products
    const handleActive = () => {
        const activeProducts = products.filter(product => product.Active === true)
        setFiltered(activeProducts)
        setCurrentPage(1) 
    }

    // filter inActive products
    const handleNotActive = () => {
        const notActiveProducts = products.filter(product => product.Active === false)
        setFiltered(notActiveProducts)
        setCurrentPage(1) 
    }

  return (
    <div>
        <div className='mb-2 flex justify-end'>
            <div className='flex gap-1'>
              <button onClick={()=>{setFiltered(products); setCurrentPage(1)}} className='bg-indigo-200 px-3 py-0.5 rounded-lg hover:scale-105 active:bg-indigo-400 text-base font-semibold text-gray-700'>
                All</button>
              <button onClick={handleActive} className='bg-indigo-200 px-3 py-0.5 rounded-lg hover:scale-105 active:bg-indigo-400 text-base font-semibold text-gray-700'>
                Active</button>
              <button onClick={handleNotActive} className='bg-indigo-200 px-3 py-0.5 rounded-lg hover:scale-105 active:bg-indigo-400 text-base font-semibold text-gray-700'>
                Not Active</button>
            </div>
        </div>
      <div className="overflow-x-auto  min-h-[29rem] flex flex-col justify-between">
      <table className="min-w-full bg-blue-50 min-h-[10rem]">
        <thead className='bg-blue-100 '>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Product ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total Stock</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">
                    <img src={product.ProductImage} alt="Product Image" className="w-12 h-12 object-cover  " />
                  </td>
                  <td className="py-2 px-4 border-b">{product.ProductID}</td>
                  <td className="py-2 px-4 border-b">{product.ProductName}</td>
                  <td className="py-2 px-4 border-b">{product.Active?(
                    <p className='bg-green-200 px-2 w-14 rounded-full text-sm font-semibold py-1 text-gray-700'>Active</p>
                    ):(
                    <p className='bg-red-200 px-2 w-16 rounded-full text-sm font-semibold py-1 text-gray-700'>Inactive</p>
                    )}</td>
                  <td className="py-2 px-4 border-b">{product.TotalStock}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/product_view/${product.ProductID}`}>
                    <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded-lg">
                      view
                    </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 border-b text-center">No products available</td>
              </tr>
            )}
        
        </tbody>
      </table>
      {/* pagination */}
      <div className=''>
      {filtered.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-indigo-200 text-gray-700'} font-semibold hover:bg-blue-500 hover:text-white`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
      </div>
      </div>
    </div>
  )
}

export default ProductTable


