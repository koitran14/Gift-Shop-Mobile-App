import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, General } from '../contants';
import { WelcomeCard, Separator } from '../components';
import { Display } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';

const pageStyle = isActive =>
  isActive
    ? styles.page
    : { ...styles.page, backgroundColor: Colors.DEFAULT_GREY };


const Pagination = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({ changed }) => {
    setWelcomeListIndex(changed[0].index);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
      animated: true,
    })
  }
  return (
    <LinearGradient
      colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent={false}
        /> */}
        <Separator height={StatusBar.currentHeight} />
        <Separator height={Display.setHeight(8)} />
        <View style={styles.welcomeListContainer}>
          <FlatList
            ref={welcomeList}
            data={General.WELCOME_CONTENTS}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            overScrollMode='never'
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item }) => <WelcomeCard {...item} />}
          />
        </View>
        {/* <Separator height={Display.setHeight(8)} /> */}
        {/* <Pagination index={welcomeListIndex} /> */}
        {/* <Separator height={Display.setHeight(8)} /> */}

        <View style={styles.footerContainer}>
          {welcomeListIndex !== General.WELCOME_CONTENTS.length - 1 ? (
            <>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => welcomeList.current.scrollToEnd()}>
                  <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pageScroll}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              </View>
              <Pagination index={welcomeListIndex} />
            </>
          ) : (

            <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.gettingStartedButton}>
              <Text style={styles.gettingStartedButtonText}
                onPress={() => navigation.navigate('Signin')}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  welcomeListContainer: {
    height: '70%',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 20,
  },
  pageContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  page: {
    height: 10,  // Kích thước của hình tròn
    width: 10,   // Kích thước của hình tròn
    borderRadius: 5,  // borderRadius bằng một nửa kích thước để tạo hình tròn
    marginHorizontal: 8, // Khoảng cách giữa các hình tròn
    backgroundColor: Colors.DEFAULT_BLACK, // Màu sắc khi active
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Điều chỉnh chiều rộng này nếu cần
    paddingHorizontal: 20, // Điều chỉnh padding ngang để tăng/khuyết khoảng cách
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 16 * 1.4,
  },
  button: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 20,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    bottom: 90,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontWeight: '400',
  },


});

export default WelcomeScreen;