import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const SearchBar = ({handleSearch}) => {
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        placeholder="search"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    height: 50,
    width: '100%',
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
  },
});

export default SearchBar;
