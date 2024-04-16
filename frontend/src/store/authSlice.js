import { createSlice } from "@reduxjs/toolkit";
import {
  GET_SESSION_USER,
  GET_IS_LOGIN,
  REMOVE_SESSION_USER,
} from "../Constant/constant";

const getUserFromSessionStorage = () => {
  const userData = GET_SESSION_USER();
  return userData ? userData : null;
};
const getLoginFromSessionStorage = () => {
  const isLogin = GET_IS_LOGIN;
  return isLogin ? JSON.parse(isLogin) : false;
};

const initialState = {
  user: getUserFromSessionStorage(),
  error: null,
  isLogin: getLoginFromSessionStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isLogin = true;

      sessionStorage.setItem("user", JSON.stringify(action.payload));
      sessionStorage.setItem("isLogin", "true");
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isLogin = false;

      REMOVE_SESSION_USER();
      sessionStorage.setItem("isLogin", "false");
    },
    logout: (state, action) => {
      state.user = null;
      state.error = null;
      state.isLogin = false;

      REMOVE_SESSION_USER();
      sessionStorage.setItem("isLogin", "false");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
