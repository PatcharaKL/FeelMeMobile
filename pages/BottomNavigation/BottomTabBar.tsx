import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const BottomTabBar = ({navigation, state}: any) => {
  const SmilingFaceIcon = (props: any) => {
    return <Icon {...props} animation={'pulse'} name="smiling-face" />;
  };
  const GridIcon = (props: any) => {
    return <Icon {...props} name="grid" />;
  };
  const SettingsIcon = (props: any) => {
    return <Icon {...props} name="settings" />;
  };
  const PeopleIcon = (props: any) => {
    return <Icon {...props} name="people" />;
  };
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={SmilingFaceIcon} title="FeelMe" />
      <BottomNavigationTab icon={PeopleIcon} title="Peoples" />
      <BottomNavigationTab icon={GridIcon} title="Board" />
      <BottomNavigationTab icon={SettingsIcon} title="Setting" />
    </BottomNavigation>
  );
};
export default BottomTabBar;
