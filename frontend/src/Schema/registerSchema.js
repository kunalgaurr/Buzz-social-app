import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters long.')
    .max(20, 'Password should exceed 20 characters.')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,}$/,
      'Password must contain atleast one uppercase character, one lowercase character, one number, and one special character.'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match.'),
});
