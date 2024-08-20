import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import catogriesSlice from "./catgories/catogriesSlice";
import ProductSlice from "./Products/ProductSlice";
import cartSlice from "./cart/cartSlice";
import whishlistSlice from "./whishlist/whishlistSlice";
import authSlice from "./auth/authSlice";
import orderSlice from "./orders/orderSlice";

const rootpersistConfig = {
  key: "root",
  storage,
  whiteList: ["cartSlice", "authSlice"],
};
const authpresentConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};
const cartpersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const rootReducer = combineReducers({
  catogriesSlice,
  ProductSlice,
  orderSlice,
  cartSlice: persistReducer(cartpersistConfig, cartSlice),
  whishlistSlice,
  authSlice: persistReducer(authpresentConfig, authSlice),
});

const persistReducers = persistReducer(rootpersistConfig, rootReducer);

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistReducers,

  // midlware is to reconfig some acton during data transfer
  // we stop serializableCheck during transfer data to some action to prevent errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { persistor, store };
