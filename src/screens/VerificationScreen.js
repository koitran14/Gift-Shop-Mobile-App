import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Images} from '../contants';
import {Display} from '../utils';

const VerificationScreen = ({
  route: {
    params: {phoneNumber},
  },
  navigation
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const [validOtp, setValidOtp] = useState(false);

  useEffect(() => {
    const valid = {1: '1', 2: '2', 3: '3', 4: '4'};
    const isValid = Object.keys(valid).every(key => valid[key] === otp[key]);
    setValidOtp(isValid)
  }, [otp])


  const submit = () => {
    if (validOtp) {
      console.log("Valid OTP.")
      navigation.navigate('Signin');
    }
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>

      <View style={styles.frameParent}>
        <Text style={styles.topic}>Enter OTP</Text>
        <Text style={styles.halfOpaqueText}>
        Enter the OTP code we just sent to your phone number{' '}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
        </Text>
        <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={submit}
        disabled={!validOtp}>
        <Text style={styles.signinButtonText}>Verify</Text>
      </TouchableOpacity>
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
  topic: {
    fontSize: 25,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 34,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFA,
    borderWidth: 0.5,
    marginTop: 10,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
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
  halfOpaqueText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 9,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 30,
    marginBottom: 0,
    marginHorizontal: 35,
  },
});

export default VerificationScreen;