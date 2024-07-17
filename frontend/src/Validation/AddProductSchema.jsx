import * as Yup from 'yup'; 

export const initialValue = {
    product_id: '',
    product_code: '',
    product_name: '',
    hsncode: '',
    // size:"",
    // color:"",
    // stock:"",
   
};


export const AddProductSchema = Yup.object().shape({
    product_id: Yup.number().required('Product ID is required'),
    product_code: Yup.string()
      .min(4, 'Product Code must be at least 4 characters')
      .required('Product Code is required'),
    product_name: Yup.string()
      .matches(/^[A-Z]/, 'Product Name must start with a capital letter')
      .min(4, 'Product Name must be at least 4 characters')
      .required('Product Name is required'),
    hsncode: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, 'HSN Code must not contain special characters')
      .required('HSN Code is required'),
    // size: Yup.string().required('Size is required'),
    // color: Yup.string().required('Size is required'),
    // stock: Yup.string().required('Size is required'),
    //   picture: Yup.mixed().required('A picture is required').test(
    //     "fileSize",
    //     "The file is too large",
    //     value => value && value.size >= 1048576 // 1 MB
    //   ).test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    //   ),
    // variants: Yup.array().of(
    //   Yup.object().shape({
    //     size: Yup.string().required('Size is required'),
    //     color: Yup.string().required('Color is required'),
    //     stock: Yup.number().min(1, 'Stock must be greater than 0').required('Stock is required')
    //   })
    // )
})