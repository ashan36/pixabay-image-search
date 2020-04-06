import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Chip} from 'react-native-paper';

const TYPES = ['all', 'photo', 'illustration', 'vector'];
const CATEGORIES = [
  'all',
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'tranportation',
  'travel',
  'buildings',
  'business',
  'music',
];
const COLORS = [
  'all',
  'grayscale',
  'tranparent',
  'red',
  'orange',
  'yellow',
  'green',
  'turquoise',
  'blue',
  'lilac',
  'pink',
  'white',
  'gray',
  'black',
  'brown',
];

const SearchBar = ({handleSearch, handleUpdateFilter, currentFilters}) => {
  const [inputText, setInputText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');

  useEffect(() => {
    for (let [key, value] of Object.entries(currentFilters)) {
      switch(key) {
        case "image_type":
          setSelectedType(value);
          break;
        case "category":
          setSelectedCategory(value);
          break;
        case "colors":
          setSelectedColor(value);
          break;
        default:
          return;
      }
    }
  }, [currentFilters]);

  const toggleShowAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  const updateFilter = () => {
    const filter = {};
    if (selectedType !== "all") {
      filter.image_type = selectedType;
    }
    if (selectedCategory !== "all") {
      filter.category = selectedCategory;
    }
    if (selectedColor !== "all") {
      filter.colors = selectedColor;
    }

    toggleShowAdvanced();
    handleUpdateFilter(filter);
  };

 const removeFilter = (removedFilter) => {
    const newFilter = {};
    for (let [key, value] of Object.entries(currentFilters)) {
      if (key !== removedFilter) {
        newFilter[key] = value;
      }
    }
    switch(removedFilter) {
      case "image_type":
        setSelectedType('all');
        break;
      case "category":
        setSelectedCategory('all');
        break;
      case "colors":
        setSelectedColor('all');
        break;
    }

    handleUpdateFilter(newFilter);
  };

  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchBar}>
        <Icon name="md-search" size={20} />
        <TextInput
          placeholder="search"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
          style={styles.searchInput}
        />
        <Button title="filter" onPress={toggleShowAdvanced} />
      </View>
      <View style={styles.filterWrapper}>
        {Object.entries(currentFilters).map((filter) => (
          <Chip key={filter[0]} onClose={() => removeFilter(filter[0])} style={{margin: 3}}>
            {`${filter[0]}: ${filter[1]}`}
          </Chip>
        ))}
      </View>
      {showAdvanced && (
        <View style={styles.advancedWrapper}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerText}>Type</Text>
            <Picker
              prompt="Type"
              selectedValue={selectedType}
              onValueChange={(value) => setSelectedType(value)}>
              {TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerText}>Category</Text>
            <Picker
              prompt="Category"
              selectedValue={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}>
              {CATEGORIES.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerText}>Color</Text>
            <Picker
              prompt="Color"
              selectedValue={selectedColor}
              onValueChange={(value) => setSelectedColor(value)}>
              {COLORS.map((color) => (
                <Picker.Item key={color} label={color} value={color} />
              ))}
            </Picker>
          </View>
          <Button title="Add Filters" onPress={updateFilter} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    width: '100%',
    backgroundColor: '#888',
    justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    width: '60%',
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  filterWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: "wrap",
    marginVertical: 5
  },
  pickerWrapper: {
    paddingLeft: 10
  },
  pickerText: {
    color: "rgb(0, 122, 255)",
    fontSize: 16,
  },
  advancedWrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10
  },
});

export default SearchBar;
