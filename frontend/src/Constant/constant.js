export const AUTHENTICATION_ERROR_MESSAGE = "Invalid email or password.";
// export const GET_SESSION_USER = sessionStorage.getItem("user");
export const GET_IS_LOGIN = sessionStorage.getItem("isLogin");

export const GET_SESSION_USER = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const REMOVE_SESSION_USER = () => {
  sessionStorage.removeItem("user");
};

export const REMOVE_IS_LOGIN = () => {
  sessionStorage.removeItem("isLogin");
};
export const SET_IS_LOGIN = (value) => {
  sessionStorage.setItem("isLogin", value);
};
export const SET_NAME = (value) => {
  sessionStorage.setItem("name", value);
};
export const REACT_PORT = 3000;
export const BASEURL = "http://localhost:5000/";

