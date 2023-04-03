import * as yup from "yup"

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").trim().required("The field is required"),
    password : yup.string().required("The field is required")
})