import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {userContext} from '../../contexts/userContext';
import useAuthorize from './useAuthorize copy';
import {usePullToken} from '../../hooks/useAsynceStorage';
// import theme from '../../assets/theme.json';

const LandingPage = ({navigation}: any) => {
  const isAuthorized = useAuthorize();
  const {accessToken, refreshToken} = usePullToken();
  const {setUserToken} = useContext(userContext);
  console.log('authorized?: ' + isAuthorized);
  console.log('Local Token: ' + accessToken, refreshToken);
  const handleGetToken = async () => {
    try {
      if (!isAuthorized) {
        navigation.replace('Login');
      } else {
        setUserToken({
          accessToken: accessToken,
          refreshToken: refreshToken,
          authenticated: true,
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
