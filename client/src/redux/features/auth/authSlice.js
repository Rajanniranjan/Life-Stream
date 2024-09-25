import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";
// token ko check karege ki user ke pass token hai yaa nhi
// createSlice se slices ko create kar sakte hai, and that
// can work as reducer or action
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

  // token ko intial time par null kar diya
// intial state as an object
const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
};
// reducer function -> authSlice, store me use
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  // authAction ko extraReducers ke andar handle karege
  // userLogin authAction se aaya hai
  extraReducers: (builder) => {
    // login user
    // pending case ho to
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // success case, ho to, if api is success
    //payload-> jo ye data return karega
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    });
    // reject case if api fail
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    
    // REGISTER user, user register kar rha
    // three condition
    // pending case
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //success case --> jo data return karega <--> payload
    // with the help of payload we can chane our data
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      // success so make, loading state false
      state.loading = false;
      state.user = payload.user;
    });

   // Rejected case --> error case
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // CURRENT user
    // three condition
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice;
