const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    try {
        const blog = new Blog({
            title,
            content,
            author
        });

        await blog.save();
        res.redirect('/dashboard');
    } catch (error) {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.render('dashboard', { user: req.user, blogs, error: error.message });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.redirect('/dashboard');
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user.id) {
            return res.redirect('/dashboard');
        }

        await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        res.redirect('/dashboard');
    } catch (error) {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.render('dashboard', { user: req.user, blogs, error: error.message });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.redirect('/dashboard');
        }

        // Check if user is the author
        if (blog.author.toString() !== req.user.id) {
            return res.redirect('/dashboard');
        }

        await Blog.findByIdAndDelete(id);
        res.redirect('/dashboard');
    } catch (error) {
        res.redirect('/dashboard');
    }
};

// Like a blog
exports.likeBlog = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.redirect(`/blog/${id}`);
        }

        // Toggle like
        if (blog.likes.includes(userId)) {
            blog.likes = blog.likes.filter(likeId => likeId.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();
        res.redirect(`/blog/${id}`);
    } catch (error) {
        res.redirect(`/blog/${id}`);
    }
};
