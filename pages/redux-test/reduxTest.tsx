import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {changeAccessToken} from '../../features/auth/tokensSlicer';
const ReduxTest = () => {
  const [token, setToken] = useState('');
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.tokens);
  const handler = () => {
    dispatch(changeAccessToken(token));
  };
  return (
    <Layout style={styles.container}>
      <Input placeholder="Token" onChangeText={setToken} value={token} />
      <Button onPress={handler}>Update</Button>
      <Text>
        Access: {tokens.accessToken} Refresh: {tokens.refreshToken}
      </Text>
    </Layout>
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
export default ReduxTest;
