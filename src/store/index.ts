import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slice/Auth/auth.slice";
import hospitalVerificationReducer from "./slice/hospital/hospitalVerification.slice";

/* ---------------- Persist configs ---------------- */

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "userId",
    "role",
    "email",
    "name",
    "accessToken",
    "isAuthenticated",
    "forcePasswordReset",
  ],
};

const hospitalVerificationPersistConfig = {
  key: "hospitalVerification",
  storage,
  whitelist: [
    "city",
    "name",
    "email",
    "register_no",
    "status",
    "verificationId",
    "adminRemarks",
  ],
};

/* ---------------- Persisted reducers ---------------- */

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  hospitalVerification: persistReducer(
    hospitalVerificationPersistConfig,
    hospitalVerificationReducer
  ),
});

/* ---------------- Store ---------------- */

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

/* ---------------- Types ---------------- */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
