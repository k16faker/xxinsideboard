import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";


import dataReducer from "./datadrill";

// const store = configureStore({
//   reducer: { data: dataReducer },
// });

// export default store;


const reducers = combineReducers({
   data: dataReducer,
});

const persistConfig = {
  key:'root',
  storage,
  whitelist: ['data']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
