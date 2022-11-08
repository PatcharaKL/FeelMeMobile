import {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from '../contexts/userContext';

export const usePullToken = () => {
  const [accessToken, setAccessToken]: any = useState(null);
  const [refreshToken, setRefreshToken]: any = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('ACCESS_TOKEN').then(res =>
        setAccessToken(res),
      );
      await AsyncStorage.getItem('REFRESH_TOKEN').then(res =>
        setRefreshToken(res),
      );
      return {accessToken, refreshToken};
    } catch (e) {
      console.log(e);
    }
  };
  return {accessToken, refreshToken};
};

export const useStorageStoreData = (key: string, value: JSON) => {
  const [data, setData] = useState(null);
  const jsonValue = JSON.stringify(value);
  const storeData = async () => {
    try {
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log('error saving data!');
    }
  };

  return [data];
};
