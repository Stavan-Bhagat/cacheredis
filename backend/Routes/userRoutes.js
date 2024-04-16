const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authentication = require("../middleware/authentication"); 

// Define routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userdata', authentication, userController.getUserData); // Apply authentication middleware here
router.get('/refreshtoken', userController.refreshToken);

module.exports = router;
