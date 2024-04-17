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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    console.log("Response Headers:", response.headers); 
    // Update access token in sessionStorage if a new token is received
    if (response.headers.authorization) {
      const newAccessToken = response.headers.authorization.split(" ")[1];
      console.log("New access token:", newAccessToken);
      sessionStorage.setItem("accessToken", newAccessToken);
    }

    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Access token has expired"
    ) {
      try {
        // Attempt to refresh the access token
        const refreshToken = sessionStorage.getItem("refreshToken");
        const refreshResponse = await axios.post(
          `${BASEURL}/refreshToken`, // Adjust the endpoint according to your server implementation
          { refreshToken }
        );

        // Update the access token with the new one received from the server
        const newAccessToken = refreshResponse.data.accessToken;
        console.log("New access token:", newAccessToken);
        sessionStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new access token
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
//     // const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     // if (refreshToken) {
//     //   config.headers["refresh-token"] = refreshToken;
//     // }

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
//     console.log("Response Headers:", response.headers); 
//     // Update access token in sessionStorage if a new token is received
//     if (response.headers.authorization) {
//       const newAccessToken = response.headers.authorization.split(" ")[1];
//       console.log("New access token:", newAccessToken);
//       sessionStorage.setItem("accessToken", newAccessToken);

//       // Retry the original request with the new access token if it failed due to an expired token
//       return axiosInstance.request(response.config);
//     }

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
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           throw new Error("No refresh token available");
//         }
//         console.log("Refreshing access token...");

//         const refreshResponse = await axios.post(
//           `${BASEURL}/refresh/refreshtoken`,
//           {
//             refreshToken,
//           }
//         );

//         const newAccessToken = refreshResponse.data.accessToken;
//         console.log("New access token:", newAccessToken);
//         sessionStorage.setItem("accessToken", newAccessToken);

//         // Retry the original request with the new access token
//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance.request(error.config);
//       } catch (refreshError) {
//         console.error("Error refreshing access token:", refreshError);
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
