import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./datadrill";

const store = configureStore({
  reducer: { data: dataReducer },
});

export default store;
