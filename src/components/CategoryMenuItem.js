// Importing necessary resources from react-native
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {Colors, Fonts, Images} from '../contants';

const CategoryMenuItem = ({name, logo, activeCategory, setActiveCategory, special, backgroundColor}) => {
  // Applying conditional styles based on active state and special prop
  // const containerStyle = [
  //   styles.category(),
  //   special && styles.specialCategory, // Apply special styles for marked categories
  // ];
  // const iconStyle = styles.categoryIcon(activeCategory === name);
  // const textStyle = styles.categoryText(activeCategory === name);
  // const backgroundColor = Colors[name] || 'transparent';
  // const backgroundColor = Colors(name)

  return (
    <TouchableOpacity
      onPress={() => setActiveCategory(name)}
      style={styles.categoryContainer}>
      <Image
        source={Images[logo]}
        style={styles.categoryIcon}
      />
      <View style={[styles.textBackground, { backgroundColor: backgroundColor || Colors.DEFAULT_WHITE }]}>
        <Text style={styles.categoryText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Adjusting or adding to the existing styles
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'flex-start', // Align self is used to align the component itself according to the flex direction of the parent
  },
  categoryIcon: {
    height: 30, // Set the height accordingly
    width: 30, // Set the width accordingly
    resizeMode: 'contain',
    position: 'absolute', // Position absolute will take the icon out of the flow of the document, making it overlay on the text background
    top: -15, // Adjust the top position to match the design
    left: 14, // Adjust the left position to match the design
    zIndex: 1, // Ensure the icon stacks on top
    // paddingLeft
  },

  textBackground: {
    backgroundColor: Colors.DEFAULT_WHITE,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 15, // Add left margin to create space for the absolutely positioned icon
    minHeight: 50, // Adjust the height to ensure it looks good with the icon
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  specialBackground: {
    backgroundColor: 'blue', // Or any other color you want for special items
  },
  categoryText: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
  },
});


export default CategoryMenuItem;
