// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({baseUrl: 'http://13.213.77.57'}),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    login: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: formVal => ({
        url: '/User/UserLogin',
        method: 'POST',
        body: formVal,
      }),
    }),
    refreshAllToken: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: formVal => ({
        url: '/User/NewTokenByRefreshToken',
        method: 'POST',
        body: formVal,
      }),
    }),
    logout: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: formVal => ({
        url: '/User/UserLogOut',
        method: 'POST',
        body: formVal,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useLoginMutation, useRefreshAllTokenMutation, useLogoutMutation} =
  apiSlice;
