const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const userService = require("../Service/userService");
const redisClient = require('../config/redisClient');

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });
      if (userData.success) {
        const expiresIn = "15m";
        const email = userData.user.email;
        const accessToken = jwt.sign({ email }, jwtSecretKey, {
          expiresIn,
        });
        // Generate refresh token
        const refreshToken = jwt.sign(
          { email: userData.user.email },
          jwtSecretKey,
          { expiresIn: "60m" }
        );
        res.status(200).json({
          success: true,
          message: userData.message,
          accessToken,
          refreshToken,
          user: userData.user,
        });
      } else {
        let statusCode = 401;
        if (userData.message === "Login failed") {
          statusCode = 404;
        }
        res
          .status(statusCode)
          .json({ success: false, message: userData.message });
      }
    } catch (error) {
      console.error(`login controller error: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const getUserData = await userService.register({
        name,
        email,
        password,
        role,
      });
      // Invalidate cache
      redisClient.del('userData');

      res
        .status(201)
        .json({ message: "User registered successfully", getUserData });
    } catch (error) {
      console.error(`register controller error: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserData: async (req, res) => {
    try {
      // Try to get user data from Redis cache
      const cachedUserData = await redisClient.get('userData');

      if (cachedUserData) {
        // If user data is found in cache, return it
        res.status(200).json(JSON.parse(cachedUserData));
      } else {
        // If user data is not found in cache, fetch from database
        const userData = await userService.getUserData();

        // Cache the user data in Redis
        redisClient.set('userData', JSON.stringify(userData), 'EX', 3600); // Cache for 1 hour

        res.status(200).json(userData);
      }
    } catch (error) {
      console.error(`getUserData controller error: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateUserData: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, password, role } = req.body;
      let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      }
      const updatedUserData = await userService.updateUserData({
        id,
        name,
        email,
        password,
        role,
        imageUrl
      });

      // Invalidate cache
      redisClient.del('userData');

      res.status(200).json(updatedUserData);
    } catch (error) {
      console.error(`updateUserData controller error: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUserData: async (req, res) => {
    try {
      const { id } = req.query;
      const deletedUserData = await userService.deleteUserData(id);

      // Invalidate cache
      redisClient.del('userData');

      res.status(200).json(deletedUserData);
    } catch (error) {
      console.error(`deleteUserData controller error: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.headers["refresh-token"];
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      const newAccessToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );
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
