const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    try {
        const post = new Post({
            title,
            content,
            author
        });

        await post.save();
        await post.populate('author', 'username');

        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;

        const posts = await Post.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 })
            .limit(limit);

        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get post by ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You can only edit your own posts' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        ).populate('author', 'username');

        res.json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You can only delete your own posts' });
        }

        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get posts by user
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
