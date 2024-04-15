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
        // const { message, name =} = userData;
        // Generate JWT token
        const token = jwt.sign(userData, jwtSecretKey, { expiresIn: "20s" });
        res.status(200).json({ success: true, message:userData.message, token ,user:userData.user});
        console.log("uuuuuuuuuuuuuuuuuu",userData.user);
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
};

module.exports = userController;
