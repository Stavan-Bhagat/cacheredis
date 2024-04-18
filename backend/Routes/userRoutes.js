const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const blogController = require("../Controller/blogController");
const authentication = require("../middleware/authentication"); 

// Define routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userdata', authentication, userController.getUserData); 
router.get('/getblogdata', authentication, blogController.getBlogData); 
router.post('/addblogdata', blogController.addBlogData); 
router.get('/refreshtoken', userController.refreshToken);

module.exports = router;
