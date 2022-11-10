import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login-Page/Login';
import Main from './main-page/main-page';
import LandingPage from './landing-page/landingPage';
import Setting from './setting-page/setting';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="landing-page" component={LandingPage} />
      <Screen name="Login" component={Login} />
      <Screen name="Main" component={Main} />
      <Screen name="Setting" component={Setting} />
    </Navigator>
  </NavigationContainer>
);
