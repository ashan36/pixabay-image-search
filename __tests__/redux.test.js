import reducer from '../src/reducers/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import {
  conditionalSelectImage,
  updateQuery,
  updateFilters,
  addError,
  clearError,
} from '../src/actions/actions';

const INITIAL_STATE = {
    isFetching: false,
    query: '',
    filters: {},
    images: [],
    selectedIndex: null,
    lastRequestedPage: 0,
    totalHits: null,
    errorMessage: '',
  };
  
describe('initial app state', () => {
    let store = {};

    beforeEach(() => {
        store = createStore(
            reducer,
            applyMiddleware(promiseMiddleware, thunk, logger),
          );
    });

    test('initial state', () => {
        expect(store.getState()).toEqual(INITIAL_STATE);
    });

    test('update query', () => {
        store.dispatch(updateQuery("nature"));
        expect(store.getState().query).toBe("nature");
    });

    test('updateFilters', () => {
        store.dispatch(updateFilters({image_type: "vector", colors: "grayscale"}));
        expect(store.getState().filters).toEqual({image_type: "vector", colors: "grayscale"});
    });

    test('add error', () => {
        store.dispatch(addError("Request failed"));
        expect(store.getState().errorMessage).toBe("Request failed");
    });

    test('clear error', () => {
        store.dispatch(addError("Request failed"));
        store.dispatch(clearError());
        expect(store.getState().errorMessage).toBe('');
    });

    test('select image', () => {
        store.dispatch(conditionalSelectImage(1));
        expect(store.getState().selectedIndex).toBe(null);
    })
});