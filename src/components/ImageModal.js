import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Image, Button, StyleSheet} from 'react-native';

const ImageModal = ({image, deselectImage, width, height}) => {
  return (
    <Modal visible={image ? true : false} transparent>
      {image ? (
        <View
          style={{...styles.detailsCard, width: width, height: height * 0.8}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Image Details</Text>
          <Image
            style={{width: width - 50, height: '65%'}}
            source={{uri: image.previewURL}}
            resizeMode="contain"
          />
          <Text>{`Tags: ${image.tags}`}</Text>
          <Text>{`Uploader: ${image.user}`}</Text>
          <Text>{`Original Resolution: ${image.imageWidth} x ${image.imageHeight}`}</Text>
          <Button style={styles.button} title="close" onPress={deselectImage} />
        </View>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailsCard: {
    position: 'absolute',
    top: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, .85)',
    borderWidth: 1,
  },
  button: {
    borderColor: 'black',
    width: 80,
    height: 30,
  },
});

export default ImageModal;
