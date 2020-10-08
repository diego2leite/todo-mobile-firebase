import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import './src/services/firebase';

import AppProvider from './src/hooks';
import Routes from './src/routes';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <SafeAreaProvider style={{paddingTop: 24}}>
      <StatusBar style="dark" backgroundColor="#F0F0F5" />
      <AppProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
