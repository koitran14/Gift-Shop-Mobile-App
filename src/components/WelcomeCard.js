import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Display} from '../utils';
import {Fonts, Colors, Images} from '../contants';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const WelcomeCard = ({title, content, image}) => {
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf')
      })
    
      if (!fontsLoaded) {
        return <AppLoading/>
      }


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  contentText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_LIGHT,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default WelcomeCard;