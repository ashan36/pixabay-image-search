import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Image, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ImageModal = ({image, deselectImage, width, height}) => {
  return (
    <Modal visible={image ? true : false}>
      {image ? (
        <View
          style={{...styles.detailsCard, width: width, height: height * 0.8}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Image Details</Text>
          <View style={styles.imageWrapper}>
            <Image
              style={{width: "100%", height: "100%", marginBottom: 10}}
              source={{uri: image.previewURL}}
              resizeMode="contain"
            />
            <View style={styles.iconWrapper}>
              <Text>
                <Icon name="like2" size={18} />
                {` ${image.likes}`}
              </Text>
              <Text>
                <Icon name="staro" size={18} />
                {` ${image.favorites}`}
              </Text>
            </View>
          </View>
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
    backgroundColor: 'rgb(200, 200, 200)',
  },
  imageWrapper: {
    width: "90%",
    height: '50%',
    marginVertical: 20,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-between',
  },
  button: {
    borderColor: 'black',
    width: 80,
    height: 30,
  },
});

export default ImageModal;
