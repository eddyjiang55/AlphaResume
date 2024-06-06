"use client"

import {
    configureStore,
    combineReducers,
} from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "./storage";
import { createLogger } from 'redux-logger'; 
import { resumeSlice } from './features/resumeSlice';
import { userSlice } from './slices/userSlice'; // 添加 userSlice

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [resumeSlice.name]: resumeSlice.reducer,
});

const persistConfig = {
    key: "nextjs",
    storage: storage,
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore =
    configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            const defaultMiddleware = getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                }
            });
            return defaultMiddleware.concat(createLogger({
                duration: true,
                timestamp: false,
                collapsed: true,
                colors: {
                    title: () => '#139BFE',
                    prevState: () => '#1C5FAF',
                    action: () => '#149945',
                    nextState: () => '#A47104',
                    error: () => '#ff0005',
                },
                predicate: () => typeof window !== 'undefined',
            }));
        }
    });