import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}
const initialState: Token = {
  accessToken: '',
  refreshToken: '',
};
const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    changeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    changeRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      AsyncStorage.removeItem('TOKEN');
    },
  },
});

export const {setToken, changeAccessToken, changeRefreshToken, logout} =
  tokensSlice.actions;
export default tokensSlice.reducer;
