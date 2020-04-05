import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';

const ImageGrid = ({
  images,
  imageHeight,
  imageWidth,
  colNums,
  listMargin,
  requestNextPage,
  handleImageSelect,
}) => {

  const styles = StyleSheet.create({
    image: {
      height: imageHeight,
      width: imageWidth,
    },
  });

  const [viewedIndex, setViewedIndex] = useState();
  const viewRef = useRef((info) => viewableItemsInfo(info));
  const listRef = useRef();

  const renderImage = (image, index) => {
    const selectImage = () => {
      handleImageSelect(index);
    };
    return (
      <TouchableOpacity
        onPress={selectImage}
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
      const offset = Math.floor(viewedIndex / colNums) * imageHeight;
      setTimeout(() => {
        listRef.current.scrollToOffset({animated: false, offset});
      }, 0);
    }
  }, [colNums]);

  return (
    <>
      {images.length > 0 && (
        <FlatList
          ref={listRef}
          key={colNums}
          numColumns={colNums}
          extraData={colNums}
          data={images}
          renderItem={({item, index}) => renderImage(item, index)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: imageHeight,
            offset: imageHeight * index,
            index,
          })}
          onEndReached={requestNextPage}
          onEndReachedThreshold={0.8}
          onViewableItemsChanged={viewRef.current}
        />
      )}
      </>
  );
};

export default ImageGrid;
