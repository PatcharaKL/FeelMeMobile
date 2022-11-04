import {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from '../contexts/userContext';

export const usePullToken = () => {
  const {setUserToken} = useContext(userContext);

  useEffect(() => {
    const localToken = '123';
    setUserToken(localToken);
  }, [setUserToken]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('TOKEN');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
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
