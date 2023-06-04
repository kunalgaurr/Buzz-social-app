import axios from 'axios';

export const axiosClient = async (url, method, data) => {
  axios({
    url,
    method,
    data,
  });
};
