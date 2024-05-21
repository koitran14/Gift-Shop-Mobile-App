import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    SplashScreen,
    WelcomeScreen,
    SigninScreen,
    SignupScreen,
    ForgotPasswordScreen,
    RegisterPhoneScreen,
    VerificationScreen,
    HomeScreen,
    FavoriteScreen,
    CartScreen,
    ProfileScreen,
    SearchScreen,
    ProductScreen,
    CheckoutScreen,
    VoucherScreen,
} from '../screens';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const Navigators = ({ token }) => {
    return (
        <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                { token ? (
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Signin" component={SigninScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                        <Stack.Screen name="Verification" component={VerificationScreen} />
                    </>
                ) : (
                    <>

                        
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                        <Stack.Screen name="CartScreen" component={CartScreen} />
                        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                        <Stack.Screen name="ProductScreen" component={ProductScreen}/>
                        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
                        <Stack.Screen name="VoucherScreen" component={VoucherScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
        token: state.generalState.token,
    }
}

export default connect(mapStateToProps)(Navigators);
