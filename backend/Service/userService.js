const User = require("../Models/userModel");
const CryptoJS = require("crypto-js");
const secretKey = process.env.ENCRYPTED_PASSWORD_KEY;
const userService = {
  login: async (userData) => {
    try {
      console.log("Login userData:", userData);
      const user = await User.findOne({ email: userData.email });
      console.log("Userrrrrrrr data:", user);

      if (!user) {
        return { success: false, message: "Login failed" };
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === userData.password) {
        return {
          success: true,
          message: "Login successful",
          user: user,
        };
      } else {
        return { success: false, message: "Login failed" };
      }
    } catch (error) {
      console.log("userService login error:", error);
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const createUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      });
      console.log("present user", createUser);
      return createUser;
    } catch (error) {
      console.log("user service register error ", error);
      throw error;
    }
  },
  getUserData: async () => {
    try {
      const getUserData = await User.find({});
      console.log("getuserdata-----------------", getUserData);
      return getUserData;
    } catch (error) {
      console.log("getting User Data error ", error);
      throw error;
    }
  },
};

module.exports = userService;
