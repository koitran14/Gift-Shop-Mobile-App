import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Images, Fonts } from '../contants';
import { Display } from '../utils';

const SplashScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to full opacity
      duration: 3000, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();

    // Navigate after a delay to mimic loading
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={styles.container}
    >
      <StatusBar barStyle='light-content' backgroundColor={Colors.DEFAULT_GREEN} translucent />
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Image source={Images.GIFT} resizeMode='contain' style={styles.image} />
        <Text style={styles.titleText}>GiftShop</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Display.setHeight(40),
    width: Display.setWidth(80),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 28,
    fontFamily: Fonts.POPPINS_THIN, // Ensure font is loaded or use a fallback
  },
});

export default SplashScreen;
