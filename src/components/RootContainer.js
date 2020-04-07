import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchImages,
  conditionalSelectImage,
  updateQuery,
  updateFilters,
  clearError,
} from '../actions/actions';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';
import {Snackbar} from 'react-native-paper';

const THUMBNAIL_HEIGHT = 100;
const THUMBNAIL_WIDTH = 100;

const RootContainer = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.isFetching);
  const images = useSelector((state) => state.images);
  const totalHits = useSelector((state) => state.totalHits);
  const query = useSelector((state) => state.query);
  const selectedIndex = useSelector((state) => state.selectedIndex);
  const filters = useSelector((state) => state.filters);
  const errorMessage = useSelector((state) => state.errorMessage);

  const availableHeight = useWindowDimensions().height;
  const availableWidth = useWindowDimensions().width;
  const colNums = Math.floor(availableWidth / THUMBNAIL_WIDTH);
  const listMargin = availableWidth % THUMBNAIL_WIDTH;

  const handleSearch = (query) => {
    dispatch(updateQuery(query));
    dispatch(fetchImages());
  };

  const handleUpdateFilter = (filter) => {
    dispatch(updateFilters(filter));
    if (query !== '') {
      dispatch(fetchImages());
    }
  };

  const requestNextPage = () => {
    //Haven't received all results, request next page
    if (images.length < totalHits) {
      dispatch(fetchImages());
    }
  };

  const handleImageSelect = (index) => {
    dispatch(conditionalSelectImage(index));
  };

  return (
    <>
      <SearchBar
        handleSearch={handleSearch}
        handleUpdateFilter={handleUpdateFilter}
        currentFilters={filters}
      />
      <View style={styles.gridWrapper}>
        <ImageGrid
          images={images}
          totalHits={totalHits}
          isFetching={isFetching}
          colNums={colNums}
          listMargin={listMargin}
          requestNextPage={requestNextPage}
          handleImageSelect={handleImageSelect}
          imageHeight={THUMBNAIL_HEIGHT}
          imageWidth={THUMBNAIL_WIDTH}
        />
        {isFetching && (
          <ActivityIndicator
            style={styles.spinner}
            animating={isFetching}
            size={50}
          />
        )}
      </View>
      <ImageModal
        image={selectedIndex !== null ? images[selectedIndex] : null}
        deselectImage={() => handleImageSelect(null)}
        width={availableWidth}
        height={availableHeight}
      />
      <Snackbar
        visible={errorMessage !== ''}
        duration={5000}
        onDismiss={() => dispatch(clearError())}
        action={{label: 'dismiss', onPress: () => dispatch(clearError())}}>
        {errorMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  gridWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  centerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  spinner: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    top: '44%',
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    borderRadius: 50,
    zIndex: 900,
  },
});

export default RootContainer;
