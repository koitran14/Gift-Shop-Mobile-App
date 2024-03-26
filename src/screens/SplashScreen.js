import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors, Images, Fonts } from '../contants';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';
import { Display } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
          translucent
        />
        <Image
          source={Images.GIFT}
          resizeMode='contain'
          style={styles.image}
        />
        <Text style={styles.titleText}>GiftShop</Text>
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.DEFAULT_GREEN,
  },
  image: {
    height: Display.setHeight(40),
    width: Display.setWidth(80),
  },
  titleText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 30,
    fontFamily: Fonts.POPPINS_BOLD,
  }
});


export default SplashScreen;