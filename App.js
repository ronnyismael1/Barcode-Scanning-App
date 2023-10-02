import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import QRCodeScannerScreen from './src/screens/QRCodeScannerScreen';

const Stack = createStackNavigator(); // Create a stack navigator

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '**Under Development**' }}/>
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{ title: null }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
