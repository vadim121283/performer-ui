import { configureStore } from '@reduxjs/toolkit';
import initReducer from '../init/initSlice';
import authReducer from '../auth/authSlice';
import drawerReducer from '../drawer/drawerSlice';

export const store = configureStore({
  reducer: {
    init: initReducer,
    auth: authReducer,
    drawer: drawerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
