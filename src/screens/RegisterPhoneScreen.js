import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Colors, Fonts, CountryCode, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlagItem, Separator} from '../components';
import {Display} from '../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StaticImageService} from '../services';

const getDropdownStyle = y => ({...styles.countryDropdown, top: y + 60});

const RegisterPhoneScreen = ({navigation}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find(country => country.name === 'India'),
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={({nativeEvent: {pageX, pageY}}) =>
        closeDropdown(pageX, pageY)
      }>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      /> */}
      <Image source={Images.CAKE} style={styles.banhKem11} resizeMode="cover" />
      <Image source={Images.STAR} style={styles.gift51} resizeMode="cover" />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Phone Number Registration</Text>
      </View>

      <View style={styles.frameParent}>
        <View style={styles.content}>
          <Text style={styles.content}>
          Enter your registered phone number to log in
          </Text>
          <Text style={styles.halfOpaqueText}>
          Phone Number
          </Text>
          <View
        style={styles.inputsContainer}
        onLayout={({
          nativeEvent: {
            layout: {y},
          },
        }) => setInputsContainerY(y)}>
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Image
            source={{uri: StaticImageService.getFlagIcon(selectedCountry.code)}}
            style={styles.flatIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={styles.inputText}
            onChangeText={text =>
              setPhoneNumber(selectedCountry?.dial_code + text)
            }
          />
        </View>
      </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.signinButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Verification', {phoneNumber})}>
        <Text style={styles.signinButtonText}>Continue</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: {x, y, height, width},
            },
          }) => setDropdownLayout({x, y, height, width})}>
          <FlatList
            data={CountryCode}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <FlagItem
                {...item}
                onPress={country => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(90deg, rgba(231, 192, 248, 0.70) 0%, rgba(188, 204, 243, 0.70) 100%)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  halfOpaqueText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 50,
    marginLeft: 19,
    marginBottom: 0,
    marginHorizontal: '20%',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 30,
    marginBottom: 0,
    marginHorizontal: 20,
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    marginTop: -50,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_BLACK,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_BLACK,
    justifyContent: 'center',
    flex: 1,
    marginTop: -50,
  },
  flatIcon: {
    height: 20,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
  },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: 'absolute',
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
  },
  signinButton: {
    backgroundColor: 'rgba(222, 128, 237, 100)',
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  banhKem11: {
    height: "43.31%",
    width: "80%",
    top: "4.46%",
    right: "-31.81%",
    bottom: "52.23%",
    left: "35%",
    position: "absolute",
    overflow: "hidden"
  },

  gift51: {
    top: 450,
    left: -34,
    width: 200,
    height: 200,
    position: "absolute"
  },
  frameParent: {
    backgroundColor: "#fff",
    width: 359,
    height: 230,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50,
    display: 'flex',
    paddingHorizontal: 8,
    marginTop: 50,
  },
});

export default RegisterPhoneScreen;