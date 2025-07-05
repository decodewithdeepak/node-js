const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Add a comment
exports.addComment = async (req, res) => {
    const { id } = req.params; // blog ID
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.redirect(`/blog/${id}`);
        }

        // Create new comment
        const comment = new Comment({
            content,
            author: userId,
            blog: id
        });

        await comment.save();

        // Add comment reference to blog
        blog.comments.push(comment._id);
        await blog.save();

        res.redirect(`/blog/${id}`);
    } catch (error) {
        res.redirect(`/blog/${id}`);
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    const { blogId, commentId } = req.params;
    const userId = req.user.id;

    try {
        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.redirect(`/blog/${blogId}`);
        }

        // Check if user is the author of the comment
        if (comment.author.toString() !== userId) {
            return res.redirect(`/blog/${blogId}`);
        }

        // Remove comment from blog's comments array
        await Blog.findByIdAndUpdate(
            blogId,
            { $pull: { comments: commentId } }
        );

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        res.redirect(`/blog/${blogId}`);
    } catch (error) {
        res.redirect(`/blog/${blogId}`);
    }
};

// Get comments for a blog
exports.getCommentsByBlog = async (blogId) => {
    try {
        const comments = await Comment.find({ blog: blogId })
            .populate('author', 'username')
            .sort({ createdAt: 1 }); // oldest first
        return comments;
    } catch (error) {
        return [];
    }
};
