import {Layout, Input, Button, Text, Icon} from '@ui-kitten/components';
import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {userContext} from '../../contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import theme from '../../assets/theme.json';

const LandingPage = ({navigation}: any) => {
  const {userToken, setUserToken} = useContext(userContext);
  const handleGetToken = async () => {
    try {
      const localToken = await AsyncStorage.getItem('TOKEN');
      if (localToken == null) {
        navigation.replace('Login');
      } else {
        setUserToken(localToken);
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
