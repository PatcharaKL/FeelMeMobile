import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login-Page/Login';
import Main from './BottomNavigation/main-page';
import LandingPage from './landing-page/landingPage';
import Setting from './setting-page/setting';
import Questionnaire from './Questionnaire/Questionnaire';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown: false}}>
      {/* <Screen name="landing-page" component={LandingPage} />
      <Screen name="Login" component={Login} />
      <Screen name="Main" component={Main} />
      <Screen name="Setting" component={Setting} /> */}
      <Screen name="questionnaire" component={Questionnaire} />
    </Navigator>
  </NavigationContainer>
);
