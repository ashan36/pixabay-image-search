import {getImages} from './pixabay';

//actions
export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const NEXT_PAGE = 'NEXT_PAGE';

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

function requestImages() {
  return {
    type: REQUEST_IMAGES,
  };
}

function receiveImages(images) {
  return {
    type: RECEIVE_IMAGES,
    images,
  };
}

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(requestImages());
    const data = await getImages(state.query, state.lastRequestedPage + 1);
    return dispatch(receiveImages(data.hits));
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
