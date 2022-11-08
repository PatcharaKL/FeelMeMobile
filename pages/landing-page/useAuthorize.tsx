import {useEffect, useState, useContext} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userContext} from '../../contexts/userContext';

// interface Token {
//   accessToken: string | null;
//   refreshToken: string | null;
// }

const useAuthorize = async () => {
  const {userToken, setUserToken, authenticated} = useContext(userContext);

  const getLocalToken = async () => {
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
    setUserToken({accessToken: accessToken, refreshToken: refreshToken});
  };

  const verifyToken = () => {
    var current_time = new Date().getTime() / 100;
    if (!userToken.accessToken) {
      return false;
    }
    const tokenDecoded: any = jwtDecode(userToken.accessToken);
    // console.log(current_time, tokenDecoded.exp);
    if (current_time > tokenDecoded.exp) {
      console.log('Token has been Expired');
      // Fetch for new access token
      axios.post(
        'https://63690be328cd16bba7137caa.mockapi.io/User/refreshAccess',
        {
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
        },
      );
    }
    // .then(res => console.log(res));
    return false;
  };

  useEffect(() => {
    getLocalToken();
    verifyToken();
  }, []);
};
export default useAuthorize;
