import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
//here redux store ko create kar rhe 
// with help of configureStore we create store
const store = configureStore({
  reducer: {
    
    auth: authSlice.reducer,
  },
});

export default store;
