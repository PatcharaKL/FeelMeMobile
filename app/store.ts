import {configureStore} from '@reduxjs/toolkit';
import tokensReducer from '../features/auth/tokensSlicer';
import userReducer from '../features/user/userSlice';
import {apiSlice} from '../features/api/apiSlice';
import weaponReducer from '../features/user/weaponSlice';

const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    user: userReducer,
    weapon: weaponReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
