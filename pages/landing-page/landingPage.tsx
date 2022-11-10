import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import useAuthorize from './useAuthorize copy';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {setToken} from '../../features/auth/tokensSlicer';
import {useAppDispatch} from '../../app/hook';
// import theme from '../../assets/theme.json';

const LandingPage = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  // const isAuthorized = useAuthorize();
  // const [token] = useAsyncStorage('TOKEN');
  // const {setUserToken} = useContext(userContext);

  const handleGetToken = async () => {
    try {
      // if (!token) {
      //   navigation.replace('Login');
      // } else {
      //   dispatch(
      //     setToken({
      //       accessToken: token.accessToken,
      //       refreshToken: token,
      //     }),
      //   );
      // }
      navigation.replace('Login');
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
