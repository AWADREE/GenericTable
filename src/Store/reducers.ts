import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./Slices/HomeSlice";

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
