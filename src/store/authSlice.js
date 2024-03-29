import { createSlice } from "@reduxjs/toolkit";

const getUserFromSessionStorage = () => {
  const userData = sessionStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
const getLoginFromSessionStorage=()=>{
  const isLogin = sessionStorage.getItem("isLogin");
  return isLogin ? JSON.parse(isLogin) : false;
};

const initialState = {
  user: getUserFromSessionStorage(),
  error: null,
  isLogin:getLoginFromSessionStorage() ,
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

      sessionStorage.removeItem("user");
      sessionStorage.setItem("isLogin", "false");
    },
    logout: (state, action) => {
      state.user = null;
      state.error = null;
      state.isLogin = false;

      sessionStorage.removeItem("user");
      sessionStorage.setItem("isLogin", "false");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
