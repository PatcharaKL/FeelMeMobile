import {useEffect, useState, useContext} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {userContext} from '../../contexts/userContext';

const useAuthorize = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {userToken, setUserToken} = useContext(userContext);

  const verifyToken = () => {
    let current_time = new Date().getTime() / 1000;
    try {
      var tokenDecoded: any = jwtDecode(userToken.accessToken);
      try {
        if (current_time > tokenDecoded.exp) {
          fetchNewTokenByRefreshToken();
        } else {
          setIsAuthorized(true);
        }
      } catch (e) {
        setIsAuthorized(false);
        console.log(e);
      }
    } catch (e) {
      setIsAuthorized(false);
      console.log(e);
    }
  };

  const fetchNewTokenByRefreshToken = () => {
    axios
      .post('http://13.213.77.57/User/NewTokenByRefreshToken', {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
      })
      .then(res => console.log(res));
  };

  useEffect(() => {
    verifyToken();
  }, []);

  console.log(isAuthorized);
  return isAuthorized;
};
export default useAuthorize;
