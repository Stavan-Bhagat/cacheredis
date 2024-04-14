export const AUTHENTICATION_ERROR_MESSAGE = "Invalid email or password.";
export const GET_SESSION_USER = sessionStorage.getItem("user");
export const GET_IS_LOGIN = sessionStorage.getItem("isLogin");

export const REMOVE_SESSION_USER = () => {
  sessionStorage.removeItem("user");
};

export const REMOVE_IS_LOGIN = () => {
  sessionStorage.removeItem("isLogin");
};


export const REACT_PORT=3000
export const  BASEURL="http://localhost:5000/"
// config=