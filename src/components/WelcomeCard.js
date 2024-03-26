import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Display } from '../utils';
import { Fonts, Colors, Images } from '../contants';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const WelcomeCard = ({ title, content, image }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.contentText}>{content}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'relative',
    justifyContent: 'space-between', // Điều chỉnh dựa trên không gian cần thiết
    alignItems: 'center',
    width: Display.setWidth(100),
    paddingVertical: 50,
  },
  image: {
    maxHeight: Display.setHeight(40),
    maxWidth: Display.setWidth(80),
    bottom:20,

  },
  titleText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_BOLD,
    marginVertical: 0,
    bottom:50,
  },
  contentText: {
    position:'absolute',
    fontSize: 18,
    fontFamily: Fonts.POPPINS_LIGHT,
    textAlign: 'center',
    // paddingHorizontal: 20,
    // top:800,
    zIndex:1,
    bottom:0,
    // top:0,
    flex:1,

  },


});

export default WelcomeCard;