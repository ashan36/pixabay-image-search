import {
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  SELECT_IMAGE,
  UPDATE_QUERY,
  UPDATE_FILTERS,
} from './actions';

const INITIAL_STATE = {
  isFetching: false,
  query: "",
  filters: {},
  images: [],
  selectedIndex: null,
  lastRequestedPage: 0,
  totalHits: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return {...state, query: action.query, lastRequestedPage: 0, images: []};
    case UPDATE_FILTERS:
      return {...state, filters: action.filter, lastRequestedPage: 0, images: []}
    case SELECT_IMAGE:
      return {...state, selectedIndex: action.index};
    case REQUEST_IMAGES:
      return {
        ...state,
        isFetching: true,
        selectedIndex: null,
        lastRequestedPage: state.lastRequestedPage + 1,
      };
    case RECEIVE_IMAGES:
      return {
        ...state,
        isFetching: false,
        images: [...state.images, ...action.images],
        totalHits: action.totalHits
      };
    default:
      return state;
  }
};

export default reducer;
