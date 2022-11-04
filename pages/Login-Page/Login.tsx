import {Layout, Input, Button, Text} from '@ui-kitten/components';
import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {userContext} from '../../contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import theme from '../../assets/theme.json';
import axios from 'axios';
const Login = ({navigation}: any) => {
  const {setUserToken} = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressFunction = async () => {
    axios
      .post('http://13.213.77.57/User/UserLogin', {
        email: email,
        password: password,
      })
      .then(res => {
        setUserToken(res.data);
        storeData(res.data);
        console.log(res.status);
        navigation.replace('Main');
      })
      .catch(err => console.log(err));
  };
  const storeData = async (tokenValue: string) => {
    try {
      await AsyncStorage.setItem('TOKEN', tokenValue);
    } catch (error) {
      console.log('error saving data!');
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.container}>
        <Layout style={styles.formContainer}>
          <Text style={styles.text} category="h1">
            Feel Me
          </Text>
          <Input
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button style={styles.button} onPress={onPressFunction}>
            Login
          </Button>
        </Layout>
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
});
export default Login;
