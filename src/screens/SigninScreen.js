import React,{useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput,TouchableOpacity,Image} from 'react-native';
import { Separator,ToggleButton } from '../components';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import {Colors,Fonts, Images} from '../contants';
import {Display} from '../utils';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { GeneralAction } from '../actions';
import { AuthenticationService } from '../services';

const SigninScreen = ({navigation, setToken}) => {
  const [isPasswordShow, setIsPasswordShow] =  useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async() => {
    setIsLoading(true);
    let user = { 
      username: username, 
      password: password 
    }; 
    AuthenticationService.login(user).then(response => {
      setIsLoading(false);
      if (response.data) setToken(`${response.data}`);
      console.log("Token from login: " + response.data)
      navigation.navigate('Homescreen')
      if (!response?.status){
        setErrorMessage(response?.message);
      }
    })
  }

  return (
    <View style={styles.container}>
    {/* <StatusBar
      barStyle="dark-content"
      backgroundColor={Colors.DEFAULT_WHITE}
      translucent
    /> */}
      <Separator height={StatusBar.currentHeight} />
      <Image source={Images.CAKE} style={styles.banhKem11} resizeMode="cover" />
      <Image source={Images.STAR} style={styles.gift51} resizeMode="cover" />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
      <Text style={styles.headerTitle}>Sign In</Text>
      </View>
    
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>Enter your email and password</Text>
  
      <View style={styles.frameParent}>
      <View style={styles.frameGroup}>
      <Text style={[styles.logIn, styles.logInFlexBox]}>{` Login`}</Text>
          <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                  <Feather 
                    name="user"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{marginRight: 10}}
                  />
                  <TextInput 
                    placeholder ="Username"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    onChangeText={(text) => setUserName(text)}
                  />
              </View>
          </View>
          <Separator height={15} />
          <View style={styles.inputContainer} >
              <View style={styles.inputSubContainer}>
                  <Feather
                    name="lock"
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{marginRight: 10}}
                  />
                  <TextInput
                    secureTextEntry={isPasswordShow ? false : true}
                    placeholder ="Password"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    style={styles.inputText}
                    onChangeText={text => setPassword(text)}
                  />
                  <Feather
                    name= {isPasswordShow ? "eye" : "eye-off"}
                    size={22}
                    color={Colors.DEFAULT_GREY}
                    style={{marginRight: 10}}
                    onPress={() => setIsPasswordShow(!isPasswordShow) }
                  />
              </View>
          </View>
          {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
          <View style={styles.forgotPasswordContainer}>

              <View style={styles.toggleContainer}>
                  <ToggleButton size={0.5} />

                  <Text style={styles.rememberMeText}>
                      Remember me
                  </Text>
              </View>
              <Text 
                style={styles.forgotPasswordText} 
                onPress={() => navigation.navigate('ForgotPassword')}
              > Forgot password</Text>
          </View>
          <TouchableOpacity 
            style={styles.signinButton}
            onPress={() => signIn()}
            activeOpacity={0.8}>
            {isLoading ? 
              (<LottieView source={Images.LOADING} autoPlay style={{ width: "100%", height: "100%"}}/>)
            :(
              <Text style={styles.signinButtonText}>Sign In</Text>
            )}         
          </TouchableOpacity>
          <View style={styles.signupContainer}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <Text  
              style={styles.signupText}
              onPress={() => navigation.navigate('Signup')}
              >
                Sign up
                </Text>
          </View>
          </View>
          </View>
    
          <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
    
  );
  };

const styles = StyleSheet.create(
{
      container: {
        flex: 1,
        backgroundColor: 'linear-gradient(90deg, rgba(231, 192, 248, 0.70) 0%, rgba(188, 204, 243, 0.70) 100%)', 
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 30,
        // paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 10,
      },
    headerTitle: {
        fontSize:20,
        lineHeight: 20*1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        width: Display.setWidth(80),
        textAlign:'center',
    },
    title: {
        fontSize:25,
        lineHeight: 25*1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginBottom:10,
        marginHorizontal:20,
    },
    content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginBottom: 10,
        marginHorizontal: 20,
    },

    frameParent: {
      backgroundColor: "#fff",
      width: 359,
      height: 360,
      // marginLeft:28,
      justifyContent: "center",
      alignSelf: "center", // thay cho 'alignItems: center'
      borderRadius: 50,
      display: 'flex',
      paddingHorizontal: 8,
    },

    frameGroup: {
      height: 290,
      borderRadius: 30,
      },

    logInFlexBox: {
    textAlign: "left",
    lineHeight: 40,
    marginLeft: 15,
    color: "#000",
    },

logIn: {
  fontSize: 40,
  width: 350,
  height:60,
  fontWeight: "700",

  },

    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
      },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
        flex: 1,
      },
    forgotPasswordContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    rememberMeText: {
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_GREY,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
    forgotPasswordText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_BOLD,
      },
    signinButton: {
        backgroundColor: 'linear-gradient(90deg, rgba(231, 192, 248, 0.70) 0%, rgba(188, 204, 243, 0.70) 100%)',
        borderRadius: 30,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
      },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
    signupContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
    accountText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
    signupText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 5,
      },
    orText: {
      fontSize: 15,
      lineHeight: 15 * 1.4,
      color: Colors.DEFAULT_BLACK,
      fontFamily: Fonts.POPPINS_MEDIUM,
      marginLeft: 5,
      alignSelf: 'center',
      marginTop: 20,
      },
    facebookButton: {
        backgroundColor: '#749AFA', 
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
    googleButton: {
        backgroundColor: '#EF8686',
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    signinButtonLogo: {
        height: 18,
        width: 18,
      },
    signinButtonLogoContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25,
      },
    socialButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
    socialSigninButtonText: {
      color: Colors.DEFAULT_BLACK,
      fontSize: 13,
      lineHeight: 13 * 1.4,
      fontFamily: Fonts.POPPINS_MEDIUM,
      },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 20,
        marginTop: 10,
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
}
);

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: token => dispatch(GeneralAction.setToken(token))
  }
}

export default connect(null, mapDispatchToProps)(SigninScreen);