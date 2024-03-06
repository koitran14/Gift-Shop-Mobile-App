import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors, Images, Fonts } from '../contants';

export default function SplashScreen() {
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
    height: 150,
    width: 150,
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 28,
    fontFamily: Fonts.POPPINS_BOLD,
  }
});
