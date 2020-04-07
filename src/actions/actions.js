import {getImages} from '../utils/pixabay-api';

//actions
export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

//action creators
function selectImage(index) {
  return {
    type: SELECT_IMAGE,
    index,
  };
}

export function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query,
  };
}

export function updateFilters(filter) {
  return {
    type: UPDATE_FILTERS,
    filter,
  };
}

function requestImages() {
  return {
    type: REQUEST_IMAGES,
  };
}

function receiveImages(images, totalHits) {
  return {
    type: RECEIVE_IMAGES,
    images,
    totalHits,
  };
}

export function addError(errorMessage) {
  return {
    type: ADD_ERROR,
    errorMessage,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(requestImages());
    try {
      const data = await getImages(
        state.query,
        state.filters,
        state.lastRequestedPage + 1,
      );
      return dispatch(receiveImages(data.hits, data.totalHits));
    } catch (err) {
      dispatch(addError(err.message));
      return dispatch(receiveImages([], null));
    }
  };
};

export function conditionalSelectImage(index) {
  return (dispatch, getState) => {
    if (getState().images.length > index) {
      return dispatch(selectImage(index));
    } else {
      return dispatch(selectImage(null));
    }
  };
}
