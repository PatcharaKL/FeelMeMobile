import {configureStore} from '@reduxjs/toolkit';
import tokensReducer from '../features/auth/tokensSlicer';
import {apiSlice} from '../features/api/apiSlice';

const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
