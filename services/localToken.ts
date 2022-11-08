import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocalToken = async () => {
  var accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  var refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  console.log('FROM HERE!: ' + accessToken, refreshToken);
  return {accessToken, refreshToken};
};
export default getLocalToken;
