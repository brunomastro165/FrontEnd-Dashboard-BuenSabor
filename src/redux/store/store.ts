import { configureStore } from "@reduxjs/toolkit";
import GlobalSearch from "../slices/search";
import GlobalLogged from "../slices/logged";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // use sessionStorage for web
import GlobalUrl from "../slices/globalUrl";
import GlobalUpdated from "../slices/globalUpdate";
import GlobalInitialValues from "../slices/globalInitialValues";
import UnidadesMedida from "../slices/unidadMedida";
import GlobalCategory from "../slices/globalCategory";
import GlobalEsInsumo from "../slices/esInsumo";
import GlobalBorrados from "../slices/borradosLogicamente";
import MostrarCategoriaSelector from "../slices/mostrarCategoriaSelector";
import GlobalIdEmpresa from "../slices/idEmpresa";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

//Esta sección sirve para poder persistir los datos entre sesiones, asi no hay problemas de pérdida de datos o errores

const persistedLogged = persistReducer(persistConfig, GlobalLogged.reducer);

const persistedURL = persistReducer(persistConfig, GlobalUrl.reducer);

const persistedValues = persistReducer(
  persistConfig,
  GlobalInitialValues.reducer
);

const persistedIdEmpresa = persistReducer(
  persistConfig,
  GlobalIdEmpresa.reducer
);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  reducer: {
    search: GlobalSearch.reducer,
    logged: persistedLogged,
    globalUrl: persistedURL,
    GlobalUpdated: GlobalUpdated.reducer,
    GlobalInitialValues: persistedValues,
    UnidadesMedida: UnidadesMedida.reducer,
    GlobalCategory: GlobalCategory.reducer,
    GlobalEsInsumo: GlobalEsInsumo.reducer,
    GlobalBorrados: GlobalBorrados.reducer,
    MostrarCategoriaSelector: MostrarCategoriaSelector.reducer,
    GlobalIdEmpresa: persistedIdEmpresa,
  },
});

export const persistor = persistStore(store); //Llamamos a persistStore y le pasamos nuestra store, de esta manera la persistimos en sessionstorage

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
