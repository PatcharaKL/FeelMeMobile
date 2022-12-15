import React from 'react';
import {Divider, TopNavigation} from '@ui-kitten/components';
import Setting from '../setting-page/setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import PeoplePage from '../PeoplesPage/PeoplesPage';
import BoardPage from '../BoardPage/BoardPage';
import InteractiveEmotionPage from '../InteractiveEmotionalPage/InteractiveEmotionPage';

const {Navigator, Screen} = createBottomTabNavigator();

const Main = () => {
  return (
    <React.Fragment>
      <TabNavigator />
    </React.Fragment>
  );
};

const TabNavigator = () => {
  return (
    <>
      <TopNavigation alignment="center" title="FeelMe" />
      <Divider />
      <Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <BottomTabBar {...props} />}>
        <Screen
          name="InteractiveEmotionPage"
          component={InteractiveEmotionPage}
        />
        <Screen name="People" component={PeoplePage} />
        <Screen name="Setting" component={BoardPage} />
        <Screen name="Board" component={Setting} />
      </Navigator>
    </>
  );
};

export default Main;
