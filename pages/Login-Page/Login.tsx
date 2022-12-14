import {Layout, Input, Button, Text, Spinner} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginMutation} from '../../features/api/apiSlice';
import {setToken} from '../../features/auth/tokensSlicer';
import {useAppDispatch} from '../../app/hook';

const Login = ({navigation}: any) => {
  console.log('Login page render');
  return (
    <>
      <Layout style={styles.container}>
        <Form navigation={navigation} />
      </Layout>
    </>
  );
};
const Form = ({navigation}: any) => {
  const [login, {data, isLoading, isSuccess, isError, error}] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = async () => {
    try {
      await login({email: email, password: password}).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      storeData(data?.accessToken, data?.refreshToken);
      dispatch(
        setToken({
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        }),
      );
      navigation.replace('Main');
    } else if (isError) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const storeData = async (accToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem(
        'TOKEN',
        JSON.stringify({accToken, refreshToken}),
      );
    } catch (err) {
      console.log('error saving data!');
    }
  };

  return (
    <>
      {isLoading || isSuccess ? (
        <Layout style={styles.spinner}>
          <Spinner size="giant" />
        </Layout>
      ) : (
        <Layout style={styles.formContainer}>
          <View>
            <Text style={styles.text} category="h1">
              Feel Me
            </Text>
            <Input
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              placeholder="Password"
              style={styles.input}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Button style={styles.button} onPress={loginHandler}>
              Login
            </Button>
          </View>
        </Layout>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
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
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
