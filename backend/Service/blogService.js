const Blog = require("../Models/blogModel");

// const secretKey = process.env.ENCRYPTED_PASSWORD_KEY;
const blogService = {
  addBlog: async (blogData, file) => {
    try {
      const { title, description } = blogData;

      // Check if file exists and is an image
      if (!file || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new Error("Please upload a valid image file");
      }

      const newBlog = new Blog({
        title,
        description,
        filename: file.originalname,
        contentType: file.mimetype,
        image: file.buffer,
      });

      const createdBlog = await newBlog.save();
      return createdBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  },
  // getBlogData: async () => {
  //   try {
  //     // Query all blog documents from the database
  //     const blogData = await Blog.find({});

  //     // Decode Base64 image data back to binary format
  //     const decodedBlogData = blogData.map(blog => {
  //       const decodedImageData = Buffer.from(blog.image, 'base64');
  //       return {
  //         ...blog.toObject(), // Convert Mongoose document to plain JavaScript object
  //         image: decodedImageData,
  //       };
  //     });

  //     return decodedBlogData;
  //   } catch (error) {
  //     console.error("Error fetching blog data:", error);
  //     throw error;
  //   }
  // },
  getBlogData: async () => {
    //   try {
    //     // Query all blog documents from the database
    //     const blogData = await Blog.find({});
    //     return blogData;
    //   } catch (error) {
    //     console.error("Error fetching blog data:", error);
    //     throw error;
    //   }
    // },
    try {
      const blogData = await Blog.find({});
      const blogsWithImageData = blogData.map((blog) => {
        return {
          ...blog.toJSON(),
          imageData: Buffer.from(blog.image.buffer).toString("base64"), // Convert binary data to Base64
        };
      });
      return blogsWithImageData;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      throw error;
    }
  },

  deleteBlogData: async (id) => {
    try {
      const deleteBlogData = await Blog.findByIdAndDelete(id);
      console.log("blogdata-----------------", deleteBlogData);
      return deleteBlogData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
  updateBlogData: async (id, title, description, image) => {
    try {
      let updateFields = { title, description };
      console.log("imggggggggg1", image);
      if (image) {
        updateFields.image = image;
      }

      const updatedBlogData = await Blog.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      console.log("Updated blog data:", updatedBlogData);
      return updatedBlogData;
    } catch (error) {
      console.error("Error updating blog data:", error);
      throw error;
    }
  },
};
module.exports = blogService;
