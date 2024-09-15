import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { storageService } from "./storageService";
import selectedRowReducer from "../slice/selectedRowSlice";
import registerReducer from "../slice/registerSlice";
import addInverstorReducer from "../slice/addInvestorSlice";
import profileReducer from "../slice/profileSlice";
const persistConfig = {
  key: "root",
  storage: storageService,
  whitelist: ["row"],
};

const rootReducer = combineReducers({
  row: selectedRowReducer,
  register: registerReducer,
  addInvestor: addInverstorReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
