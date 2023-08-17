const express = require("express")
const BlogController= require ("../controllers/BlogController")
const router = express.Router()

// Blog Create Route :

router.post("/create", BlogController.CreateBlog)

// Blog Read Route with & Without ID:

router.get("/read", BlogController.ReadBlog)
router.get("/readbyid/:id", BlogController.ReadBlogByID)

// Update Blog By ID:

router.post("/updateBlog/:id", BlogController.UpdateBlog)

// Delete Blog By ID:

router.get("/deleteBlog/:id", BlogController.DeleteBlog)

// Commenting 
router.post('/addComment/:blogId', BlogController.addComment);

// Searching 
router.get('/search', BlogController.searchBlogs);



module.exports = router