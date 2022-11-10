import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}
const useAsyncStorage = (key: string) => {
  const [token, setToken] = useState<Token>({
    accessToken: '',
    refreshToken: '',
  });
  const [retrievedFromStorage, setRetrievedFromStorage] = useState(false);

  useEffect(() => {
    async () => {
      try {
        const value: any = await AsyncStorage.getItem(key);
        setToken(JSON.parse(value) || token);
        setRetrievedFromStorage(true);
      } catch (error) {
        console.error('useAsyncStorage getItem error:', error);
      }
    };
  }, [key]);

  const setNewData = async (value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setToken({
        accessToken: value.accessToken,
        refreshToken: value.refreshToken,
      });
    } catch (error) {
      console.error('useAsyncStorage setItem error:', error);
    }
  };

  return [token, setNewData, retrievedFromStorage];
};
export default useAsyncStorage;

// export const useStorageStoreData = (key: string, value: JSON) => {
//   const [data, setData] = useState(null);
//   const jsonValue = JSON.stringify(value);
//   const storeData = async () => {
//     try {
//       await AsyncStorage.setItem(key, jsonValue);
//     } catch (error) {
//       console.log('error saving data!');
//     }
//   };

//   return [data];
// };
