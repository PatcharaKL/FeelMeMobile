import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout, setToken} from '../auth/tokensSlicer';
const BASE_URL = 'http://13.213.77.57';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, {getState}: any) => {
    const accessToken = getState().tokens.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args, result);
  if (result?.error?.status === 401) {
    console.log('sending refresh token');
    try {
      console.log('Getting token from storage..');
      let token: any = await AsyncStorage.getItem('TOKEN');
      console.log('Success! Got token from storage.');
      token = JSON.parse(token);
      console.log('ReAuth body: ', token);
      // send refresh token to get new access token
      try {
        const refreshResult: any = await baseQuery(
          {
            url: '/User/NewTokenByRefreshToken',
            body: {refreshToken: token.refreshToken},
            method: 'POST',
          },
          api,
          extraOptions,
        );
        console.log('refetch result: ', refreshResult);
        if (refreshResult?.data) {
          console.log('refetch success');
          // store the new token
          const accessToken = refreshResult.data.accessToken;
          const refreshToken = refreshResult.data.refreshToken;
          StoreData({
            api,
            accessToken,
            refreshToken,
          });
          // retry the original query with new access token
          result = await baseQuery(args, api, extraOptions);
          console.log('Second Attempt result', result);
        } else {
          console.log('refetch failed');
          api.dispatch(logout());
        }
      } catch (e) {
        console.log('Error Fetching for Reauthorization', e);
        api.dispatch(logout());
      }
    } catch {
      console.log('Error getting token from AsyncStorage.');
      api.dispatch(logout());
    }
  }
  return result;
};

const StoreData = async ({api, accessToken, refreshToken}: any) => {
  api.dispatch(
    setToken({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  );
  try {
    await AsyncStorage.setItem(
      'TOKEN',
      JSON.stringify({accessToken, refreshToken}),
    );
  } catch (err) {
    console.log('error saving data!');
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Token', 'User', 'OtherUserList'],
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    login: builder.mutation({
      query: formVal => ({
        url: '/User/UserLogin',
        method: 'POST',
        body: formVal,
      }),
      invalidatesTags: ['Token'],
    }),
    refreshAllToken: builder.mutation({
      query: formVal => ({
        url: '/User/NewTokenByRefreshToken',
        method: 'POST',
        body: formVal,
      }),
      invalidatesTags: ['Token'],
    }),
    apiLogout: builder.mutation({
      query: formVal => ({
        url: '/User/UserLogOut',
        method: 'POST',
        body: formVal,
      }),
      invalidatesTags: ['Token'],
    }),
    userDetail: builder.query({
      query: formVal => ({
        url: '/User/GetUserDetail',
        method: 'POST',
        body: formVal,
      }),
      providesTags: ['User'],
    }),
    userListDetail: builder.query({
      query: formVal => ({
        url: '/User/GetEnemyDetail',
        method: 'POST',
        body: formVal,
      }),
      providesTags: ['OtherUserList'],
    }),
    dealDamage: builder.mutation({
      query: formVal => ({
        url: '/Log/AttackDamage',
        method: 'POST',
        body: formVal,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshAllTokenMutation,
  useApiLogoutMutation,
  useUserDetailQuery,
  useDealDamageMutation,
  useUserListDetailQuery,
} = apiSlice;
