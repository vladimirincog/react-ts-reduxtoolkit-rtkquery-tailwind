import { githubReducer } from './gihub/githube.slice';
import { githubApi } from './gihub/github.api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>