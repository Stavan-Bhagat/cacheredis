const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/userdata',userController.getUserData)
module.exports = router;
