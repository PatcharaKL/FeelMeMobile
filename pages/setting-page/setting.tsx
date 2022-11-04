import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import {userContext} from '../../contexts/userContext';
import {ThemeContext} from '../../contexts/theme';
import HealthBar from './HealthBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Character from './character';
const Setting = ({navigation}: any) => {
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };
  const logOut = () => {
    removeToken();
    navigation.replace('Login');
  };
  const {userToken} = useContext(userContext);
  const themeContext: any = useContext(ThemeContext);
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.bottomBanner}>
        <Button onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
        <Button onPress={logOut}>Logout</Button>
        <Text>Token: {userToken}</Text>
      </Layout>
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
});
export default Setting;
