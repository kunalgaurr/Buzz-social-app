import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email. For example - eltonjohn@gmail.com')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password should be atleast 8 characters long.')
    .max(20, 'Password cannot exceed 20 characters.')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,}$/,
      'Password must contain atleast one uppercase character, one lowercase character, one number, and one special character.'
    ),
});
