import {Layout, Text} from '@ui-kitten/components';
import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {userContext} from '../../contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
// import theme from '../../assets/theme.json';

const LandingPage = ({navigation}: any) => {
  const {setUserToken} = useContext(userContext);

  const verifyAccessToken = (token: string | null) => {
    var current_time = new Date().getTime() / 100;
    if (!token) {
      return false;
    }
    const tokenDecoded: any = jwtDecode(token);
    console.log(current_time, tokenDecoded.exp);
    if (current_time > tokenDecoded.exp) {
      console.log('Token has been Expired');
      // Fetch for new access token
      return false;
    }
    return true;
  };

  const handleGetToken = async () => {
    try {
      const localAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const localRefreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
      if (!verifyAccessToken(localAccessToken)) {
        navigation.replace('Login');
      } else {
        setUserToken({
          accessToken: localAccessToken,
          refreshToken: localRefreshToken,
        });
        navigation.replace('Main');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  }, []);

  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        FeelMe
      </Text>
      <Text style={styles.text} category="s1">
        WELCOME :D
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    margin: 1,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: '10%',
    height: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default LandingPage;
