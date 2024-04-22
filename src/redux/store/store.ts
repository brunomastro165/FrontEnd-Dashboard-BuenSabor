import { configureStore } from "@reduxjs/toolkit";
import auth from "../slices/auth";
import AuthUser from "../slices/auth";
import GlobalSearch from "../slices/search"
// ...

export const store = configureStore({
  reducer: {
    auth: AuthUser.reducer,
    search: GlobalSearch.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
