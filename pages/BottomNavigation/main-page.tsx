import React from 'react';
import {
  Avatar,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import images from '../../assets/image';
import Setting from '../setting-page/setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import PeoplePage from '../PeoplesPage/PeoplesPage';
import BoardPage from '../BoardPage/BoardPage';
import InteractiveEmotionPage from '../InteractiveEmotionalPage/InteractiveEmotionPage';
import {StyleSheet, View} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

const Main = () => {
  return (
    <React.Fragment>
      <TabNavigator />
    </React.Fragment>
  );
};
const bellIcon = (props: any) => <Icon {...props} name="bell-outline" />;
const messageIcon = (props: any) => (
  <Icon {...props} name="message-circle-outline" />
);
const TabNavigator = () => {
  const renderRightActions = () => {
    return (
      <>
        <TopNavigationAction icon={messageIcon} />
        <TopNavigationAction icon={bellIcon} />
      </>
    );
  };
  const renderLeftActions = () => {
    return (
      <View style={styles.titleContainer}>
        <Avatar
          style={styles.logo}
          shape="rounded"
          source={images.logo.logo_1}
        />
        <Text category="h5">FeelMe</Text>
      </View>
    );
  };
  return (
    <>
      <TopNavigation
        accessoryRight={renderRightActions}
        accessoryLeft={renderLeftActions}
        alignment="start"
      />
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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
});
export default Main;
