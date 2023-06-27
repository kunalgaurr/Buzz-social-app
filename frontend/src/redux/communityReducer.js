import axios from 'axios';

const COMMUNITY_REQUEST = 'COMMUNITY_REQUEST';
const COMMUNITY_SUCCESS = 'COMMUNITY_SUCCESS';
const COMMUNITY_FAILURE = 'COMMUNITY_FAILURE';

const request = () => ({
  type: COMMUNITY_REQUEST,
});

const success = () => ({
  type: COMMUNITY_REQUEST,
});

const failure = () => ({
  type: COMMUNITY_REQUEST,
});

export const createCommunity = (data) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.post('/community/create', data);
    const response = res.data;
    dispatch(success(response));
  } catch (error) {
    dispatch(failure(error));
  }
};

const INITIAL_STATE = {
  community: null,
  loading: false,
  error: null,
};

export const communityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMUNITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMMUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        community: action.payload.community,
      };
    case COMMUNITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
