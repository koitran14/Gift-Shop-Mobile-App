import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigators from './src/navigators';
import Store from './src/Store';
import { Provider } from 'react-redux';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    // Thêm các font khác ở đây
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={Store}>
      <Navigators />
    </Provider>
  );
}
