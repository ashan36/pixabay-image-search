import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
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
      switch (key) {
        case 'image_type':
          setSelectedType(value);
          break;
        case 'category':
          setSelectedCategory(value);
          break;
        case 'colors':
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
    if (selectedType !== 'all') {
      filter.image_type = selectedType;
    }
    if (selectedCategory !== 'all') {
      filter.category = selectedCategory;
    }
    if (selectedColor !== 'all') {
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
    switch (removedFilter) {
      case 'image_type':
        setSelectedType('all');
        break;
      case 'category':
        setSelectedCategory('all');
        break;
      case 'colors':
        setSelectedColor('all');
        break;
    }

    handleUpdateFilter(newFilter);
  };

  return (
    <>
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Icon
            name="md-search"
            size={24}
            style={{paddingLeft: 10, color: '#777'}}
          />
          <TextInput
            placeholder="Search"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
            style={styles.searchInput}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleShowAdvanced}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#777',
              }}>{`Filter `}</Text>
            <Icon name="ios-arrow-down" size={16} style={{color: '#777'}} />
          </TouchableOpacity>
        </View>
        <View style={styles.filterWrapper}>
          {Object.entries(currentFilters).map((filter) => (
            <Chip
              key={filter[0]}
              onClose={() => removeFilter(filter[0])}
              style={{margin: 3}}>
              {`${filter[0]}: ${filter[1]}`}
            </Chip>
          ))}
        </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    width: '100%',
    backgroundColor: '#AAA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchInput: {
    flex: 8,
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  filterButton: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5,
    height: '90%',
    paddingVertical: '2%',
  },
  filterWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  pickerWrapper: {
    paddingLeft: 10,
  },
  pickerText: {
    color: 'rgb(0, 122, 255)',
    fontSize: 16,
  },
  advancedWrapper: {
    position: 'absolute',
    paddingTop: 10,
    width: '60%',
    top: 50,
    right: 35,
    alignSelf: 'center',
    backgroundColor: '#EEE',
    borderRadius: 5,
    zIndex: 100,
  },
});

export default SearchBar;
