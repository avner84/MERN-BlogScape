const express = require('express');
const router = express.Router();

const validations = require('../middleware/validations');
const isAuth = require('../middleware/is-auth');
const blogController = require('../controllers/blog')

router.post(
    '/create-blog',
    isAuth,
    validations.createBlogValidations,
    validations.handleValidationErrors,
    blogController.createBlog
);

router.get(
    '/get-blogs',
    blogController.getBlogs
)

router.get(
    '/get-blogs-by-user',    
    blogController.getBlogsByUser
)

router.get(
    '/get-blog-by-id',    
    blogController.getBlogById
)

router.delete(
    '/delete-blog',    
    isAuth,
    blogController.deleteBlog
)

router.put(
    '/edit-blog',    
    isAuth,
    validations.createBlogValidations,
    validations.handleValidationErrors,
    blogController.updateBlog
)



module.exports = router;