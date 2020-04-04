import React, {useEffect} from 'react';
import {View, StyleSheet, TextInput, useWindowDimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchImages, conditionalSelectImage, updateQuery} from '../actions';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import ImageModal from './ImageModal';

const RootContainer = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.isFetching);
  const images = useSelector((state) => state.images);
  const selectedIndex = useSelector((state) => state.selectedIndex);
  const availableHeight = useWindowDimensions().height;
  const availableWidth = useWindowDimensions().width;
  const colNums = Math.floor(availableWidth / 100);
  const listMargin = availableWidth % 100;

  const handleSearch = (query) => {
    dispatch(updateQuery(query));
    dispatch(fetchImages());
  };

  const requestNextPage = () => {
    dispatch(fetchImages());
  };

  const handleImageSelect = (index) => {
    dispatch(conditionalSelectImage(index));
  }

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <ImageGrid
        images={images}
        isFetching={isFetching}
        colNums={colNums}
        listMargin={listMargin}
        requestNextPage={requestNextPage}
        handleImageSelect={handleImageSelect}
      />
      {selectedIndex !== null && <ImageModal image={images[selectedIndex]} deselectImage={() => handleImageSelect(null)} width={availableWidth} height={availableHeight}/>}
    </>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: '#888',
  },
  centerModal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});

export default RootContainer;
