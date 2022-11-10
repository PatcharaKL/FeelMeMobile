import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
const initialState: Tokens = {
  accessToken: '',
  refreshToken: '',
};
const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    changeAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    changeRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {setToken, changeAccessToken, changeRefreshToken} =
  tokensSlice.actions;
export default tokensSlice.reducer;
