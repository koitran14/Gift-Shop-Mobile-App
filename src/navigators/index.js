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
    CartScreen,
    ProfileScreen,
    SearchScreen,
    ProductScreen,
    CheckoutScreen,
    VoucherScreen,
    ShopScreen,
} from '../screens';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const Navigators = ({ token }) => {
    return (
        <NavigationContainer>
                { !token ? (
                    <>
                        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
                            <Stack.Screen name="Splash" component={SplashScreen} />
                            <Stack.Screen name="Welcome" component={WelcomeScreen} />
                            <Stack.Screen name="Signin" component={SigninScreen} />
                            <Stack.Screen name="Signup" component={SignupScreen} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                            <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                            <Stack.Screen name="Verification" component={VerificationScreen} />
                        </Stack.Navigator>
                    </>
                ) : (
                    <>  
                        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
                            <Stack.Screen name="HomeScreen" component={HomeScreen} />
                            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                            <Stack.Screen name="CartScreen" component={CartScreen} />
                            <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                            <Stack.Screen name="ProductScreen" component={ProductScreen}/>
                            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
                            <Stack.Screen name="VoucherScreen" component={VoucherScreen} />
                            <Stack.Screen name="ShopScreen" component={ShopScreen} />
                        </Stack.Navigator>
                    </>
                )}
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
        token: state.generalState.token,
        user: state.generalState.user,
    }
}

export default connect(mapStateToProps)(Navigators);
