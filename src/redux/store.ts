import { configureStore, combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Reducerları birleştir
const rootReducer = combineReducers ({note: noteReducer})

// Persist için
const persistConfig = {
    key: 'store',
    storage,
    whitelist: ['note'],
}

//Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                //Bu aksiyonları yok say
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    
});
// Persist Storu oluştur
export const persistor = persistStore(store);
//Store'u export et
export default store;

