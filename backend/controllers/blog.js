const Blog = require('../models/blog');


exports.createBlog = async (req, res, next) => {
    const { title, content, firstName, lastName } = req.body;

    const blog = new Blog({
        title,
        content,
        creator: req.userId
    });

    try {
        await blog.save();
        res.status(201).json({
            message: 'blog created successfully!',
            blog,
            creator: {
                _id: req.userId,
                firstName,
                lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = 'Error while creating the blog: ' + err.message;
        next(err);
    }
}

exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
            .populate('creator', 'firstName lastName');

        res.status(200).json({
            message: 'Fetched blogs successfully.',
            blogs
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBlogsByUser = async (req, res, next) => {
    const userId = req.query.userId;
    console.log('userId:', userId);

    try {
        const blogs = await Blog.find({ creator: userId })
            .populate('creator', 'firstName lastName');
            console.log('blogs :', blogs);

        res.status(200).json({
            message: 'Fetched blogs by user successfully.',
            blogs
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.getBlogById = async (req, res, next) =>{

    const blogId = req.query.id;
    console.log('blogId :', blogId);
    

    try {
        const blog = await Blog.findOne({_id: blogId })
            .populate('creator', 'firstName lastName');
            

        res.status(200).json({
            message: 'Fetched blog by id successfully.',
            blog
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}