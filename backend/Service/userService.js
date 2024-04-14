const User = require("../Models/userModel");

const userService = {
  register: async (userData) => {
    try {
      const createUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      });
      console.log("present user", createUser);
      return createUser; // Return the created user
    } catch (error) {
      console.log("userservice register error ", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },
};

module.exports = userService;
