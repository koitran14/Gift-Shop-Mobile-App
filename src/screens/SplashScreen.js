import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors, Images, Fonts } from '../contants';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';
import { Display } from '../utils';

const SplashScreen = ({ navigation }) => {
  // let [fontsLoaded] = useFonts({
  //   'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf')
  // })

  // if (!fontsLoaded) {
  //   return <AppLoading/>
  // }

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1500)

  }, []);


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image
        source={Images.GIFT}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.titleText}>GiftShop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 28,
    fontFamily: Fonts.POPPINS_THIN,
  }
});


export default SplashScreen;