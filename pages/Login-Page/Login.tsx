import {Layout, Input, Button, Text, Spinner} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginMutation} from '../../features/api/apiSlice';
import {setToken} from '../../features/auth/tokensSlicer';
import {useAppDispatch} from '../../app/hook';
const Login = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [login, {isLoading, isSuccess}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    try {
      const token = await login({email: email, password: password}).unwrap();
      storeData(token.accessToken, token.refreshToken);
      dispatch(
        setToken({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        }),
      );
      navigation.replace('Main');
    } catch (err) {
      console.error(err);
    }
  };
  const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem(
        'TOKEN',
        JSON.stringify({accessToken, refreshToken}),
      );
    } catch (err) {
      console.log('error saving data!');
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.container}>
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
      </Layout>
    </React.Fragment>
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
