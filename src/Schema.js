import * as Yup from 'yup'

export default Yup.object().shape({
    name: Yup.string().trim().required('Name is required.').min(2, "name must be at least 2 characters"),
    size: Yup.string().required('Size is required'),
    pepperoni: Yup.boolean(),
    sausage: Yup.boolean(),
    ham: Yup.boolean(),
    pineapple: Yup.boolean(),
    special: Yup.string()
})