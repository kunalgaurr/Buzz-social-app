import axios from 'axios';

const COMMENT_REQUEST = 'Comment request';
const COMMENT_SUCCESS = 'Comment success';
const COMMENT_FAILURE = 'Comment failure';

const request = () => ({
  type: COMMENT_REQUEST,
});

const success = (userId, postId, comment) => ({
  type: COMMENT_SUCCESS,
  payload: comment,
});

const failure = (error) => ({
  type: COMMENT_FAILURE,
  payload: error,
});

export const postComment = (userId, postId, comment) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.post('/comment/post', { userId, postId, comment });
    const response = res.data;
    dispatch(success(response));
    return response;
  } catch (error) {
    dispatch(failure(error));
  }
};

const INITIAL_STATE = {
  comment: null,
  loading: false,
  error: null,
};

export const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        comment: action.payload.comment,
      };
    case COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
