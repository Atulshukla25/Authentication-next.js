import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(20, "Password should not exceed 20 characters")
    .required("Password is required"),
});

export default signupSchema;
