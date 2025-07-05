# 📝 Blogify - Full Stack Blog Application

A modern, full-featured blog application built with Node.js, Express, MongoDB, and deployed on Vercel.

## 🚀 Live Demo

**Production URL**: [https://blogify-oy1ngd8q8-decodewithdeepaks-projects.vercel.app](https://blogify-oy1ngd8q8-decodewithdeepaks-projects.vercel.app)

## ✨ Features

- 🔐 **User Authentication** - Signup, Login, Logout with JWT
- 📝 **Blog Management** - Create, Read, Update, Delete blogs
- 💬 **Comment System** - Users can comment on blogs
- 🎨 **Responsive Design** - Bootstrap-powered modern UI
- 🔒 **Protected Routes** - Dashboard and blog creation require authentication
- 📱 **Mobile Friendly** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS Templates, Bootstrap 5
- **Deployment**: Vercel (Serverless)
- **Password Hashing**: bcryptjs

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blogify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Run the application**

   ```bash
   npm start        # Production mode
   npm run dev      # Development mode with nodemon
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

### Manual Deployment

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Set Environment Variables**

   - Go to your Vercel dashboard
   - Navigate to Project Settings → Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
blogify/
├── controllers/          # Business logic
│   ├── authController.js
│   ├── blogController.js
│   └── userController.js
├── middleware/           # Custom middleware
│   └── authMiddleware.js
├── models/              # Database schemas
│   ├── Blog.js
│   ├── Comment.js
│   └── User.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── commentRoutes.js
│   └── userRoutes.js
├── views/               # EJS templates
│   ├── partials/
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── dashboard.ejs
│   └── blog.ejs
├── public/              # Static files
├── app.js               # Main application file
├── package.json
├── vercel.json          # Vercel configuration
└── .env                 # Environment variables
```

## 🔑 Environment Variables

| Variable      | Description               | Example                                       |
| ------------- | ------------------------- | --------------------------------------------- |
| `PORT`        | Server port               | `3000`                                        |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/blogapp` |
| `JWT_SECRET`  | Secret key for JWT tokens | `your-super-secret-key`                       |

## 📝 API Endpoints

### Authentication

- `POST /user/signup` - Register new user
- `POST /user/login` - Login user
- `GET /user/logout` - Logout user

### Blogs

- `GET /` - Get all blogs (homepage)
- `GET /blog/:id` - Get single blog with comments
- `POST /blog/create` - Create new blog (protected)
- `PUT /blog/:id` - Update blog (protected)
- `DELETE /blog/:id` - Delete blog (protected)

### Comments

- `POST /comment/:blogId` - Add comment to blog (protected)
- `DELETE /comment/:id` - Delete comment (protected)

## 🎨 Frontend Pages

- **Homepage** (`/`) - Display all blogs
- **Login** (`/login`) - User login form
- **Signup** (`/signup`) - User registration form
- **Dashboard** (`/dashboard`) - User's personal blog management
- **Blog View** (`/blog/:id`) - Individual blog with comments

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Middleware to protect sensitive routes
- **Input Validation** - Server-side validation for all inputs

## 🚀 Performance

- **Serverless Architecture** - Deployed on Vercel for optimal performance
- **Database Connection Pooling** - Efficient MongoDB connections
- **Static File Serving** - Optimized asset delivery
- **Responsive Design** - Fast loading on all devices

## 🛡️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Verify the connection string format
   - Check username/password encoding

2. **Environment Variables Not Working**

   - Verify `.env` file is in root directory
   - Check Vercel dashboard environment variables
   - Ensure no extra spaces in variable names

3. **Authentication Issues**
   - Clear browser cookies
   - Check JWT_SECRET is set correctly
   - Verify user exists in database

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please:

1. Check the troubleshooting section
2. Open an issue on GitHub
3. Contact the maintainer

---

**Made with ❤️ by [Your Name]**
