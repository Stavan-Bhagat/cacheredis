const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const userService = require("../Service/userService");

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const userData = await userService.login({ email, password });
      if (userData.success) {
        const expiresIn = "300s";
        const email = userData.user.email;
        const accessToken = jwt.sign({ email }, jwtSecretKey, {
          expiresIn,
        });
        const expirationTime =
          Math.floor(Date.now() / 1000) + jwt.decode(accessToken).exp;
        console.log(
          "Access token expiration time:",
          new Date(expirationTime * 1000).toLocaleString()
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
          { email: userData.user.email }, 
          jwtSecretKey,
          { expiresIn: "15m" }
        );
        res.status(200).json({
          success: true,
          message: userData.message,
          accessToken,
          refreshToken,
          user: userData.user,
        });
      } else {
        const { message } = userData;
        res.status(401).json({ success: false, message });
      }
    } catch (error) {
      console.error(`login controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      console.log("userData", email, password);
      const getUserData = await userService.register({
        name,
        email,
        password,
        role,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", getUserData });
    } catch (error) {
      console.error(`register controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getUserData: async (req, res) => {
    try {
      const userData = await userService.getUserData();
      res.status(200).json(userData);
    } catch (error) {
      console.error(`getUserData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.headers["refresh-token"];

    console.log("inside refreshToken", refreshToken);
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      const newAccessToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "300s" }
      );

      // Send the new access token in the response
      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Refresh token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid refresh token" });
      } else {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};

module.exports = userController;
