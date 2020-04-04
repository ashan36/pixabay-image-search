import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

const THUMBNAIL_HEIGHT = 100;
const THUMBNAIL_WIDTH = 100;

const ImageGrid = ({
  images,
  isFetching,
  colNums,
  listMargin,
  requestNextPage,
  handleImageSelect
}) => {
  const [viewedIndex, setViewedIndex] = useState();
  const viewRef = useRef((info) => viewableItemsInfo(info));
  const listRef = useRef();

  const renderImage = (image, index) => {
    const selectImage = () => {
        handleImageSelect(index);
    }
    return (
      <TouchableOpacity onPress={selectImage}
        style={{marginLeft: listMargin / (colNums + 1), marginVertical: 0}}
        key={index}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: image.previewURL}}
        />
      </TouchableOpacity>
    );
  };

  const viewableItemsInfo = (info) => {
      if (info) {
        setViewedIndex(info.viewableItems[0].index);
      }
  };

  useEffect(() => {
    if (listRef.current) {
            const offset = Math.floor(viewedIndex / colNums) * THUMBNAIL_HEIGHT;
            setTimeout(() => {listRef.current.scrollToOffset({animated: false, offset})}, 0);
        }
  }, [colNums]);

  return (
    <>
      {isFetching && (
        <View style={styles.spinner}>
          <ActivityIndicator />
        </View>
      )}
      {images.length > 0 && (
        <FlatList
          ref={listRef}
          key={colNums}
          numColumns={colNums}
          extraData={colNums}
          data={images}
          renderItem={({item, index}) => renderImage(item, index)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => (
    {length: THUMBNAIL_HEIGHT, offset: THUMBNAIL_HEIGHT * index, index}
  )}
          onEndReached={requestNextPage}
          onViewableItemsChanged={viewRef.current}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    height: 200,
    width: 200,
    zIndex: 900,
  },
  image: {
    height: THUMBNAIL_HEIGHT,
    width: THUMBNAIL_WIDTH,
  },
});

export default ImageGrid;
