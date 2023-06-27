import * as yup from 'yup';

export const communityScema = yup.object().shape({
  name: yup
    .string('Please enter a valid name.')
    .required('Community name is required'),
  description: yup
    .string('Please enter a valid description.')
    .required('Description is required.'),
});
