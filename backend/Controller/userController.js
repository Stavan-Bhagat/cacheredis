const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;
const userService = require("../Service/userService");

const userController = {
  // login:,
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      console.log("userdata", email, password);
      const userData = await userService.register({
        name,
        email,
        password,
        role,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", userData });
    } catch (error) {
      console.error(`register controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

//
//register: async (req, res) => {
    //     try {
    //       const { name, email, password, role } = req.body;
    //       console.log("register data:", email, password);
    
    //       // Register user
    //       const userData = await userService.register({ name, email, password, role });
    
    //       res.status(201).json({ message: "User registered successfully", userData });
    //     } catch (error) {
    //       console.error(`Register controller error : ${error}`);
    //       res.status(500).json({ error: "Internal server error" });
    //     }
    //   },
module.exports = userController;

//--------------------
// const jwt = require("jsonwebtoken");
// const jwtKey = process.env.JWT_SECRET_KEY;
// const userService = require("../Service/userService");

// const userController = {
//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       console.log("login data:", email, password);

//       // Validate user credentials
//       const userData = await userService.login({ email, password });

//       if (!userData) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ email: userData.email }, jwtKey);

//       // Send JWT token in response
//       res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//       console.error(`Login controller error : ${error}`);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },

//   register: async (req, res) => {
//     try {
//       const { name, email, password, role } = req.body;
//       console.log("register data:", email, password);

//       // Register user
//       const userData = await userService.register({ name, email, password, role });

//       res.status(201).json({ message: "User registered successfully", userData });
//     } catch (error) {
//       console.error(`Register controller error : ${error}`);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },
// };

// module.exports = userController;
