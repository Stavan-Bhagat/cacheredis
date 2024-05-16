const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const blogController = require("../Controller/blogController");
const authentication = require("../middleware/authentication");
const upload = require("../config/multerConfig");

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch(
  "/updateuserdata",
  upload.single("image"),
  userController.updateUserData
);
router.delete("/deleteuserdata", userController.deleteUserData);
router.get("/userdata", authentication, userController.getUserData);
// blog routes
router.get("/getblogdata", authentication, blogController.getBlogData);
router.post("/addblogdata", upload.single("image"), blogController.addBlogData);
router.delete("/deleteblogdata", blogController.deleteBlogData);
router.patch(
  "/updateblogdata",
  upload.single("image"),
  blogController.updateBlogData
);
// cloud
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // File uploaded to Cloudinary, response contains the Cloudinary file info
    res.status(200).json({
      message: "Image uploaded successfully",
      url: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during upload",
      error: err.message,
    });
  }
});

//refresh
router.get("/refreshtoken", userController.refreshToken);

module.exports = router;
