const User = require("../Models/userModel");
const CryptoJS = require("crypto-js");
const secretKey = process.env.ENCRYPTED_PASSWORD_KEY;
const userService = {
  login: async (userData) => {
    try {
      const user = await User.findOne({ email: userData.email });
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
        return { success: false, message: "invalid credential" };
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
      return createUser;
    } catch (error) {
      console.log("user service register error ", error);
      throw error;
    }
  },
  getUserData: async () => {
    try {
      const getUserData = await User.find({});
      return getUserData;
    } catch (error) {
      console.log("getting User Data error ", error);
      throw error;
    }
  },
  deleteUserData: async (id) => {
    try {
      const deleteUserData = await User.findByIdAndDelete(id);
      return deleteUserData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  updateUserData: async ({ id, name, email, password, role,imageUrl }) => {
    try {
      console.log("ser",imageUrl)
      let updateFields = { name, email, password, role ,imageUrl};  

      const updatedUserData = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      return updatedUserData;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },
};

module.exports = userService;
