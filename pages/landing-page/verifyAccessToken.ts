import jwtDecode from 'jwt-decode';
const verifyAccessToken = (token: string | null) => {
  var current_time = new Date().getTime() / 100;
  if (!token) {
    return false;
  }
  const tokenDecoded: any = jwtDecode(token);
  console.log(current_time, tokenDecoded.exp);
  if (current_time > tokenDecoded.exp) {
    console.log('Token has been Expired');
    // Fetch for new access token
    return false;
  }
  return true;
};
export default verifyAccessToken;
