import axios from 'axios';

const POST_REQUEST = 'Post request';
const POST_SUCCESS = 'Post success';
const POST_FAILED = 'Post failed';

const request = () => ({
  type: POST_REQUEST,
});
const success = (post) => ({
  type: POST_SUCCESS,
  payload: post,
});
const failure = (error) => ({
  type: POST_FAILED,
  payload: error,
});

export const uploadPost = (post) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.post('/post/create', post);
    const response = res.data;
    dispatch(success(post));
    return response;
  } catch (error) {
    dispatch(failure(error));
  }
};

const INITIAL_STATE = {
  post: null,
  loading: false,
  error: null,
};

export const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: action.payload.post,
      };
    case POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
