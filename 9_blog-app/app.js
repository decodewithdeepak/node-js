// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { checkForAuthenticationCookie } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(checkForAuthenticationCookie('token')); // Check for JWT token in cookies
app.use(express.static('public')); // Serve static files from public directory

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes - Handle authentication, blog operations, and comments
app.use('/user', userRoutes);     // Authentication routes (signup, login, logout)
app.use('/blog', blogRoutes);     // Blog CRUD operations
app.use('/comment', commentRoutes); // Comment operations

// Frontend Routes - Serve HTML pages
// Homepage - Display all blogs
app.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const Blog = require('./models/Blog');
        const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
        res.render('index', { user: req.user, blogs });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.render('index', { user: req.user, blogs: [], error: 'Error loading blogs' });
    }
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// User dashboard - Show user's own blogs (protected route)
app.get('/dashboard', async (req, res) => {
    try {
        await connectToDatabase();
        if (!req.user) return res.redirect('/login');
        const Blog = require('./models/Blog');
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.render('dashboard', { user: req.user, blogs });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.render('dashboard', { user: req.user, blogs: [], error: 'Error loading blogs' });
    }
});

// Individual blog page with comments
app.get('/blog/:id', async (req, res) => {
    try {
        await connectToDatabase();
        const Blog = require('./models/Blog');
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            });
        if (!blog) {
            return res.render('blog', { user: req.user, blog: null, error: 'Blog not found' });
        }
        res.render('blog', { user: req.user, blog });
    } catch (error) {
        console.error('Error loading blog:', error);
        res.render('blog', { user: req.user, blog: null, error: 'Error loading blog' });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection function for serverless deployment
const connectToDatabase = async () => {
    // Check if already connected to avoid multiple connections
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';
        await mongoose.connect(MONGODB_URI, {
            bufferCommands: false, // Disable mongoose buffering for serverless
            serverSelectionTimeoutMS: 10000, // How long to try selecting a server
            socketTimeoutMS: 45000, // How long a send or receive on a socket can take
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        connectToDatabase();
    });
}

// Export for Vercel
module.exports = app;