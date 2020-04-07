import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
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
  totalHits,
}) => {
  const styles = StyleSheet.create({
    imageWrapper: {
      marginHorizontal: listMargin / (colNums * 2),
      marginVertical: 0,
    },
    image: {
      height: imageHeight,
      width: imageWidth,
    },
    emptyView: {paddingHorizontal: 20},
    emptyViewText: {textAlign: 'center', fontSize: 30, color: '#AAA'},
  });

  const [viewedIndex, setViewedIndex] = useState();
  const viewRef = useRef((info) => viewableItemsInfo(info));
  const listRef = useRef();

  const renderImage = (image, index) => {
    return (
      <TouchableOpacity
        onPress={() => handleImageSelect(index)}
        style={styles.imageWrapper}
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
  }, [colNums, imageHeight, viewedIndex]);

  return (
    <>
      {images.length > 0 ? (
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
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyViewText}>
            {totalHits === null
              ? 'Search Over 1 Million Royalty Free Images'
              : totalHits === 0
              ? 'No Results'
              : ''}
          </Text>
        </View>
      )}
    </>
  );
};

export default ImageGrid;
