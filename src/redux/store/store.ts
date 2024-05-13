//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import GlobalSearch from "../slices/search";
import GlobalLogged from "../slices/logged";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/es/storage/session"; // use sessionStorage for web
import GlobalUrl from "../slices/globalUrl";
import GlobalUpdated from "../slices/globalUpdate";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedLogged = persistReducer(persistConfig, GlobalLogged.reducer);

const persistedURL = persistReducer(persistConfig, GlobalUrl.reducer);

export const store = configureStore({
  reducer: {
    search: GlobalSearch.reducer,
    logged: persistedLogged,
    globalUrl: persistedURL,
    GlobalUpdated: GlobalUpdated.reducer,
  },
});

//let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
