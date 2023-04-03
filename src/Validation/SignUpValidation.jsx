import * as yup from "yup"

export const SignUpSchema = yup.object().shape({
    username:yup.string().required("The field username is Required"),
    email: yup.string().email("Invalid email").trim().required("The field email is required"),
    password : yup.string().min(6,"The password must be at least 6 characters").required("The field is required")
})