import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cellReducer from './features/cellSlice';
import groupSelectReducer from './features/groupSelectSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

const persistedState = JSON.parse(
  localStorage.getItem('myAppReduxState') || '{}'
);

const rootReducer = combineReducers({
  groupSelectReducer,
  cellReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
  preloadedState: persistedState,
});

const rootReducers = combineReducers({
  cellReducer,
  groupSelectReducer,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
