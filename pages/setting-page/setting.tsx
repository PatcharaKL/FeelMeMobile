import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Layout, Text, Spinner} from '@ui-kitten/components';
import {ThemeContext} from '../../contexts/theme';
import {useAppSelector, useAppDispatch} from '../../app/hook';
import {setToken} from '../../features/auth/tokensSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogoutMutation} from '../../features/api/apiSlice';
const Setting = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [logout, {isLoading, isSuccess}] = useLogoutMutation();
  const tokens = useAppSelector(state => state.tokens);

  const logOutHandler = async () => {
    try {
      await AsyncStorage.removeItem('ACCESS_TOKEN');
      await AsyncStorage.removeItem('REFRESH_TOKEN');
      try {
        await logout({accessToken: tokens.accessToken});
        try {
          dispatch(setToken({accessToken: '', refreshToken: ''}));
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Logged Out.');
    navigation.replace('Login');
  };

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
          <Text>Access Token: {tokens.accessToken}</Text>
          <Text>Access Token: {tokens.refreshToken}</Text>
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
