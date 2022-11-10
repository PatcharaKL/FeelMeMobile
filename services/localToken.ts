import AsyncStorage from '@react-native-async-storage/async-storage';

var accessToken: string | null = '';
var refreshToken: string | null = '';
const getLocalToken = async () => {
  accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  console.log('FROM HERE!: ' + accessToken, refreshToken);
  return {accessToken, refreshToken};
};
export default getLocalToken;
