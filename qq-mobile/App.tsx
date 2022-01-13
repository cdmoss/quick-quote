import { NavigationContainer } from '@react-navigation/native';
import { Logs } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import MainTabs from './src/navigation/MainTabs';

export default function App() {

  Logs.enableExpoCliLogging()
  
  return (
    <NavigationContainer>
      {/* <RootSiblingParent> */}
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <StatusBar style="auto" />
          <MainTabs />
        </SafeAreaView>
      {/* </RootSiblingParent> */}
    </NavigationContainer>
  )
}

