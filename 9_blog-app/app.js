// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { checkForAuthenticationCookie } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.use('/comment', commentRoutes);

// Frontend Routes
app.get('/', async (req, res) => {
    const Blog = require('./models/Blog');
    try {
        const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
        res.render('index', { user: req.user, blogs });
    } catch (error) {
        res.render('index', { user: req.user, blogs: [], error: 'Error loading blogs' });
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/dashboard', async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const Blog = require('./models/Blog');
    try {
        const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.render('dashboard', { user: req.user, blogs });
    } catch (error) {
        res.render('dashboard', { user: req.user, blogs: [], error: 'Error loading blogs' });
    }
});

app.get('/blog/:id', async (req, res) => {
    const Blog = require('./models/Blog');
    try {
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
        res.render('blog', { user: req.user, blog: null, error: 'Error loading blog' });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});