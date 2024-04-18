
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecretKey);

    req.userData = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Return 419 error if token is expired
      console.log("419 419 419 419 419 419 419")
      return res.status(419).json({ success: false, message: "Token expired" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};

module.exports = authentication;

// const jwt = require("jsonwebtoken");
// const jwtSecretKey = process.env.JWT_SECRET_KEY;
// const userController = require('../Controller/userController'); 
// const authentication = async(req, res, next) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];

//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(accessToken, jwtSecretKey);

//     req.userData = decoded;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       // Trigger the refreshToken endpoint
//       // return userController.refreshToken(req, res);
//       await userController.refreshToken(req, res);
        
//       next();
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid access token" });
//     }
//   }
// };

// module.exports = authentication;  
  
  
  
  // const jwt = require("jsonwebtoken");
  // const jwtSecretKey = process.env.JWT_SECRET_KEY;

// const authentication = (req, res, next) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];
// console.log("access",accessToken);
//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(accessToken, jwtSecretKey);

//     req.userData = decoded;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       const refreshToken =
//         req.body.refreshToken || req.headers["refresh-token"];

//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: "Access token has expired and no refresh token provided",
//         });
//       }

//       try {

//         // const decodedRefreshToken = jwt.verify(refreshToken, jwtSecretKey);

//         // const newAccessToken = jwt.sign(
//         //   { email: decodedRefreshToken.email },
//         //   jwtSecretKey,
//         //   { expiresIn: "1m" }
//         // );

//         // req.userData = { email: decodedRefreshToken.email };

//         // // Set the new access token in the response headers
//         // res.set("Authorization", `Bearer ${newAccessToken}`);

//         // Return success response with the new access token
//         return res.status(200).json({
//           success: true,
//           message: "New access token generated",
//           token: newAccessToken,
//         });
//       } catch (refreshError) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid refresh token" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid access token" });
//     }
//   }
// };

// module.exports = authentication;




// const authentication = (req, res, next) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];

//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(accessToken, jwtSecretKey);

//     req.userData = decoded;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       const refreshToken =
//         req.body.refreshToken || req.headers["refresh-token"];

//       console.log("refreshtokken", refreshToken);
//       console.log("hello-----------");
//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: "Access token has expired and no refresh token provided",
//         });
//       }

//       try {
//         const decodedRefreshToken = jwt.verify(refreshToken, jwtSecretKey);

//         const newAccessToken = jwt.sign(
//           { email: decodedRefreshToken.email },
//           jwtSecretKey,
//           { expiresIn: "30s" }
//         );

//         req.userData = { email: decodedRefreshToken.email };

//         res.set("Authorization", `Bearer ${newAccessToken}`);

//         next();
//       } catch (refreshError) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid refresh token" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid access token" });
//     }
//   }
// };

// module.exports = authentication;

//--------------
// const authentication = (req, res, next) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];
//   // const refreshToken = req.body.refreshToken || req.headers["refresh-token"];

//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(accessToken, jwtSecretKey);

//     req.userData = decoded;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: "Access token has expired and no refresh token provided",
//         });
//       }

//       try {
//         const decodedRefreshToken = jwt.verify(refreshToken, jwtSecretKey);

//         const newAccessToken = jwt.sign(
//           { email: decodedRefreshToken.email },
//           jwtSecretKey,
//           { expiresIn: "1m" }
//         );

//         req.userData = { email: decodedRefreshToken.email };

//         // Set the new access token in the response headers
//         res.set("Authorization", `Bearer ${newAccessToken}`);

//         // Proceed with the request
//         next();
//       } catch (refreshError) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid refresh token" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid access token" });
//     }
//   }
// };

// module.exports = authentication;

// const jwt = require("jsonwebtoken");
// const jwtSecretKey = process.env.JWT_SECRET_KEY;
// const jwt = require("jsonwebtoken");
// const jwtSecretKey = process.env.JWT_SECRET_KEY;

// const authentication = (req, res, next) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];

//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(accessToken, jwtSecretKey);

//     req.userData = decoded;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       try {
//         // Generate a new access token
//         const newAccessToken = jwt.sign(
//           { email: decoded.email }, // Assuming you have 'email' stored in the token
//           jwtSecretKey,
//           { expiresIn: "1m" } // Adjust the expiration time as needed
//         );

//         // Include the new access token in the response
//         return res.status(401).json({
//           success: false,
//           message: "Access token has expired",
//           newAccessToken
//         });
//       } catch (err) {
//         console.error("Error generating new access token:", err);
//         return res
//           .status(500)
//           .json({ success: false, message: "Internal server error" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid access token" });
//     }
//   }
// };

// module.exports = authentication;
