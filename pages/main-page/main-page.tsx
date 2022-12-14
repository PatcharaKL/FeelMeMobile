import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Spinner, TopNavigation} from '@ui-kitten/components';
import HealthBar from './HealthBar';
import Character from './character';
import Setting from '../setting-page/setting';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import PeoplePage from '../PeoplesPage/PeoplesPage';
import BoardPage from '../BoardPage/BoardPage';
import {useUserDetailQuery} from '../../features/api/apiSlice';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {setHp} from '../../features/user/userSlice';

const {Navigator, Screen} = createBottomTabNavigator();

const Main = () => {
  return (
    <React.Fragment>
      <TabNavigator />
    </React.Fragment>
  );
};

const InteractiveEmotionPage = () => {
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector(state => state.tokens);
  const {data, isSuccess, isLoading} = useUserDetailQuery({
    accessToken: accessToken,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setHp(data.hp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <Layout style={styles.spinner}>
          <Spinner />
        </Layout>
      ) : (
        <>
          <HealthBar />
          <Character />
        </>
      )}
    </Layout>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameBanner: {
    marginTop: 50,
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bottomBanner: {
    flex: 1,
    marginHorizontal: 40,
    borderRadius: 15,
    backgroundColor: '#20243c',
    overflow: 'hidden',
  },
  bottomBannerLayout: {
    flex: 1,
    alignItems: 'center',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Main;
