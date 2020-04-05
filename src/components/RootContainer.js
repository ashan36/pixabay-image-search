import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchImages, conditionalSelectImage, updateQuery} from '../actions';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';

const THUMBNAIL_HEIGHT = 100;
const THUMBNAIL_WIDTH = 100;

const RootContainer = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.isFetching);
  const images = useSelector((state) => state.images);
  const totalHits = useSelector((state) => state.totalHits)
  const selectedIndex = useSelector((state) => state.selectedIndex);

  const availableHeight = useWindowDimensions().height;
  const availableWidth = useWindowDimensions().width;
  const colNums = Math.floor(availableWidth / THUMBNAIL_WIDTH);
  const listMargin = availableWidth % THUMBNAIL_WIDTH;

  const handleSearch = (query) => {
    dispatch(updateQuery(query));
    dispatch(fetchImages());
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
      <SearchBar handleSearch={handleSearch} />
      <View style={styles.gridWrapper}>
        <ImageGrid
          images={images}
          isFetching={isFetching}
          colNums={colNums}
          listMargin={listMargin}
          requestNextPage={requestNextPage}
          handleImageSelect={handleImageSelect}
          imageHeight={THUMBNAIL_HEIGHT}
          imageWidth={THUMBNAIL_WIDTH}
        />
        {isFetching && <ActivityIndicator style={styles.spinner} animating={isFetching} size={50} />}
      </View>
      <ImageModal
        image={selectedIndex ? images[selectedIndex] : null}
        deselectImage={() => handleImageSelect(null)}
        width={availableWidth}
        height={availableHeight}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gridWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
    top: "40%",
  },
});

export default RootContainer;
