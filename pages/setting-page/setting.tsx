import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Layout, Text, Spinner} from '@ui-kitten/components';
import {ThemeContext} from '../../contexts/theme';
import {useAppSelector, useAppDispatch} from '../../app/hook';
import {logout} from '../../features/auth/tokensSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApiLogoutMutation} from '../../features/api/apiSlice';
import {setUser} from '../../features/user/userSlice';

const Setting = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [apiLogout, {isLoading, isSuccess, isUninitialized}] =
    useApiLogoutMutation();
  const {accessToken, refreshToken}: any = useAppSelector(
    state => state.tokens,
  );

  const logOutHandler = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      try {
        await apiLogout({accessToken: accessToken, refreshToken: refreshToken});
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
      dispatch(
        setUser({
          email: '',
          name: '',
          surname: '',
          hp: 0,
          level: 0,
          departmentName: '',
          positionName: '',
          companyName: '',
        }),
      );
      navigation.replace('Login');
      console.log('Logged Out.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isUninitialized, isLoading]);
  const themeContext: any = useContext(ThemeContext);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading || isSuccess ? (
        <Layout style={styles.spinner}>
          <Spinner size="giant" />
        </Layout>
      ) : (
        <Layout style={styles.bottomBanner}>
          <Button onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
          <Button onPress={logOutHandler}>Logout</Button>
          <Text>Access Token: {accessToken}</Text>
          <Text>Refresh Token: {refreshToken}</Text>
        </Layout>
      )}
    </SafeAreaView>
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
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Setting;
