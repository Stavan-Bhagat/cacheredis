
// import axios from "axios";
// import { BASEURL } from "../Constant/constant";

// const axiosInstance = axios.create({
//   baseURL: BASEURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     if (refreshToken) {
//       config.headers['refresh-token'] = refreshToken;
//     }

//     console.log("Request Interceptor:", config);
//     return config;
//   },
//   (error) => {
//     console.error("Request Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );


// axiosInstance.interceptors.response.use(
//   (response) => {

//     console.log("Response Interceptor:", response);
//     return response;
//   },
//   async (error) => {
//     console.error("Response Interceptor Error:", error);

    
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       error.response.data.message === "Invalid access token"
//     ) {
 
//       try {
//         const refreshToken = sessionStorage.getItem("refreshToken");
//         const refreshResponse = await axios.post(`${BASEURL}/refresh`, {
//           refreshToken,
//         });

//         const newAccessToken = refreshResponse.data.accessToken;
//         sessionStorage.setItem("accessToken", newAccessToken);

//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance.request(error.config);
//       } catch (refreshError) {
//         console.error("Error refreshing access token:", refreshError);
//         // Redirect to login page or handle the error as needed
//         // For example, if refresh token is expired, user may need to log in again
//         // You can redirect to the login page or display an error message
//         // In this example, I'm just returning the original error response
//         return Promise.reject(error);
//       }
//     }

//     // For other types of errors or if token refresh fails, just reject the promise with the original error
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
//--------------------------------------------------------------

import axios from "axios";
import { BASEURL } from "../Constant/constant";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers['refresh-token'] = refreshToken;
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor:", response);

    // Update access token in sessionStorage if a new token is received
    if (response.headers.authorization) {
      const newAccessToken = response.headers.authorization.split(' ')[1];
      sessionStorage.setItem("accessToken", newAccessToken);
    }

    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid access token"
    ) {
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post(`${BASEURL}/refresh/refreshtoken`, {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;
        sessionStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
