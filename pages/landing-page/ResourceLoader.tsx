import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {useUserDetailQuery} from '../../features/api/apiSlice';
import {setToken} from '../../features/auth/tokensSlicer';
import {setHp} from '../../features/user/userSlice';

const ResourceLoader = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector(state => state.tokens);
  const {data, isLoading, isError, isSuccess} = useUserDetailQuery({
    accessToken: accessToken,
  });

  useEffect(() => {
    async () => {
      let token: any = await AsyncStorage.getItem('TOKEN');
      try {
        if (!token) {
          console.info('Have no token in storage');
          navigation.replace('Login');
        } else {
          token = JSON.parse(token);
          console.info('Have token in storage.');
          console.info('In storage token: ', token);
          dispatch(
            setToken({
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      console.log('Navigating to Login page');
      navigation.replace('Login');
    } else if (isSuccess) {
      console.log('From Loading Resource: ', data.hp);
      if (data.hp || data.hp === 0) {
        console.log('Navigating to Main page');
        dispatch(setHp(data.hp));
        navigation.replace('Main');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    marginTop: 10,
  },
});
export default ResourceLoader;
