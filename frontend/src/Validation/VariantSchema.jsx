import * as Yup from 'yup';

export const initialValue ={
    size:"",
    color:"",
    Stock:""
}

export const AddVariantSchema =Yup.object().shape({
    size: Yup.number().required('required'),
    color: Yup.string().required('required'),
    Stock: Yup.number().required('required')
})