const BlogModel =  require("../models/blogModel")

// Create Blog:

exports.CreateBlog=(req,res)=>{
    let reqBody = req.body
    BlogModel.create(reqBody)
    .then((data)=>{
        res.status(200).json({status:"success", data:data})
    })
    .catch((error)=>{
        res.status(400).json({status:"fail",data:error})
    })

}

// Read All Blogs:

exports.ReadBlog=(req,res)=>{
    let Query = {}
    let Projection = "title content author"
    BlogModel.find(Query,Projection)
    .then((data) => {
        res.status(200).json({ status: "success", data: data });
    })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });}


// Read Single product By ID:

exports.ReadBlogByID = (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };

    BlogModel.findOne(Query)
        .then((data) => {
            res.status(200).json({ status: "success", data: [data] });
        })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });
};

// Update A Blog By ID:

exports.UpdateBlog = (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };
    let reqBody = req.body;

    BlogModel.updateOne(Query, reqBody)
        .then((data) => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });
};


// Delete A Blog By ID:

exports.DeleteBlog = (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };

    BlogModel.deleteOne(Query)
        .then((data) => {
            if (data.deletedCount > 0) {
                res.status(200).json({ status: "success", data: data });
            } else {
                res.status(404).json({ status: "fail", data: "Product not found" });
            }
        })
        .catch((err) => {
            res.status(400).json({ status: "fail", data: err });
        });
};

// Comment 
exports.addComment = async (req, res) => {
    const { blogId } = req.params;
    const { comment } = req.body;

    try {
        // Find the blog post by its ID
        const blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Add the new comment to the blog's comments array
        blog.comments.push({ comment });

        // Save the updated blog with the new comment
        await blog.save();

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search 

exports.searchBlogs = async (req, res) => {
    const { query } = req.query;

    try {
        const searchResults = await BlogModel.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json({ status: 'success', data: searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'fail', message: 'Server error' });
    }
};
