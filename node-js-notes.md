# Node.js Master Notes By Deepak Modi

> Recommended YouTube Playlist: [Master NodeJS by Piyush Garg](https://www.youtube.com/playlist?list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo)

## Table of Contents
1. [Introduction to Node.js](#1-introduction-to-nodejs)
   - [1.1 What is Node.js?](#11-what-is-nodejs)
   - [1.2 Node.js Installation](#12-nodejs-installation)
   - [1.3 How Node.js Works?](#13-how-nodejs-works)
   - [1.4 Hello World in Node.js](#14-hello-world-in-nodejs)

2. [Core Concepts](#2-core-concepts)
   - [2.1 Modules in Node.js](#21-modules-in-nodejs)
   - [2.2 File Handling in Node.js](#22-file-handling-in-nodejs)
   - [2.3 Building HTTP Server in Node.js](#23-building-http-server-in-nodejs)
   - [2.4 Handling URLs](#24-handling-urls)
   - [2.5 HTTP Methods](#25-http-methods)
   - [2.6 Versioning in Node.js](#26-versioning-in-nodejs)
   - [2.7 Node.js Package Manager (npm)](#27-nodejs-package-manager-npm)

3. [Express.js and APIs](#3-expressjs-and-apis)
   - [3.1 Getting Started with Express](#31-getting-started-with-express)
   - [3.2 What is RESTful API?](#32-what-is-restful-api)
   - [3.3 Building REST APIs with Node.js + Express](#33-building-rest-apis-with-nodejs--express)
   - [3.4 Express Middleware](#34-express-middleware)
   - [3.5 HTTP Headers in APIs](#35-http-headers-in-apis)
   - [3.6 HTTP Status Codes](#36-http-status-codes)
   - [3.7 Introduction to POSTMAN](#37-introduction-to-postman)

4. [Database Integration](#4-database-integration)
   - [4.1 Introduction to MongoDB](#41-introduction-to-mongodb)
   - [4.2 Connecting Node.js with MongoDB (Mongoose + Express)](#42-connecting-nodejs-with-mongodb-mongoose--express)
   - [4.3 MVC Pattern in Node.js](#43-mvc-pattern-in-nodejs)

---

## 1. Introduction to Node.js

### 1.1 What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. Created by Ryan Dahl in 2009. Built on Google Chrome's V8 JavaScript engine, Node.js enables developers to build scalable, high-performance backend applications using JavaScript.

> Example: Backend of Netflix, LinkedIn, PayPal , Uber uses Node.js!

- **Key Point:** Node.js is not a programming language or a framework—it's a runtime environment for executing JavaScript on the server side.

#### Why use Node.js?

- **Non-blocking I/O:** Handles many connections at once without waiting for operations like file or network access to finish.
- **Single Language Stack:** Use JavaScript for both frontend and backend, making full-stack development easier.
- **Fast and Efficient:** Powered by the V8 engine, Node.js is known for its speed.
- **Large Ecosystem:** npm (Node Package Manager) offers thousands of reusable packages.
- **Community Support:** Huge, active community and lots of learning resources.

**Comparison Example:**

- Traditional backend (e.g., PHP, Java): Each request may create a new thread, which is resource-intensive.
- Node.js: Uses a single-threaded event loop to handle many requests efficiently.

#### Node.js in Modern Web Development

Node.js is used for:

- REST APIs
- Real-time chat apps (e.g., WhatsApp clones)
- Streaming services (e.g., Netflix)
- IoT applications
- Command-line tools

**Real-World Example:**
Netflix, PayPal, LinkedIn, and Uber use Node.js for parts of their backend systems.


### 1.2 Node.js Installation

#### Installing Node.js

- **Windows/Mac/Linux:** Download from [nodejs.org](https://nodejs.org/). Installer includes npm.
- **Check installation:**

```bash
node -v
npm -v
```

#### Using REPL (Read-Eval-Print Loop)

REPL lets you run JavaScript code interactively in the terminal:

```bash
node
> 2 + 2
4
> .exit
```

#### Running Scripts

Save your code in a `.js` file and run:

```bash
node hello.js
```

#### Using nodemon for Development

`nodemon` automatically restarts your app when files change.

```bash
npm install -g nodemon
nodemon app.js
```

### 1.3 How Node.js Works?

Node.js operates on an event-driven, non-blocking I/O model that makes it lightweight and efficient for building scalable network applications.  		
The core of Node.js is built around the event loop, which allows Node.js to handle multiple requests without creating new threads for each.

![Node.js Architecture](https://d2ms8rpfqc4h24.cloudfront.net/working_flow_of_node_7610f28abc.jpg)

#### The Event Loop Architecture

The event loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. When Node.js performs an I/O operation, like reading from the network or accessing a database, instead of blocking and waiting for the operation to complete, Node.js will resume the operation when the response comes back.

```js
// Example demonstrating non-blocking behavior
console.log('Start');

setTimeout(() => {
    console.log('Timeout callback');
}, 0);

setImmediate(() => {
    console.log('Immediate callback');
});

console.log('End');

// Output: Start, End, Immediate callback, Timeout callback
```

#### V8 JavaScript Engine

Node.js is built on Google Chrome's V8 JavaScript engine, which compiles JavaScript directly to native machine code instead of interpreting it or executing it as bytecode. This makes Node.js applications incredibly fast and efficient.

#### libuv Library

Under the hood, Node.js uses libuv, a multi-platform C library that provides support for asynchronous I/O based on event loops. It handles file system operations, DNS lookup, network operations, and more.

### 1.4 Hello World in Node.js

Creating your first Node.js application is straightforward and demonstrates the fundamental difference between server-side JavaScript and browser JavaScript. This simple example shows how to execute JavaScript code outside the browser environment.

```javascript
console.log('Hello Node!');

// console.log(window); // Error in Node.js environment but works in browser
// console.log(alert("Hey there!")); // Error in Node.js environment but works in browser
```

> Note:- Window objects, ui elements, and other browser-specific features are not available in Node.js.

This example demonstrates a key difference between Node.js and browser JavaScript:

- Node.js has no access to browser-specific objects like `window` or `document`
- Browser functions like `alert()` don't exist in Node.js
- Node.js includes server-specific features not available in browsers

To run this example, save it as `hello.js` and execute:

```bash
node hello.js
```

This will display "Hello Node!" in your terminal, demonstrating that Node.js is correctly executing JavaScript code outside the browser environment.

## 2. Core Concepts

### 2.1 Modules in Node.js

Modules are the building blocks of Node.js applications. They allow you to organize your code into separate files and reuse functionality across different parts of your application. Node.js supports both CommonJS and ES modules.

#### CommonJS Modules (Default)

CommonJS is the traditional module system in Node.js, using `require()` and `module.exports`.

```javascript
// math.js
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
module.exports = { add, subtract };

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

#### ES Modules (Modern)

ES Modules (ECMAScript Modules) use `import` and `export` statements. To use ES modules, add `"type": "module"` to your `package.json` or use `.mjs` file extension.

```javascript
// math.mjs (or math.js with "type": "module")
export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}

// app.mjs (or app.js with "type": "module")
import { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

### 2.2 File Handling in Node.js

File handling is crucial for many Node.js applications. The `fs` module provides both synchronous and asynchronous methods for file operations. While synchronous methods block the event loop, asynchronous methods allow other operations to continue while waiting for file I/O to complete.

#### Synchronous vs Asynchronous Operations
- **Sync (Blocking):** Synchronous file operations block the event loop until completion, which can lead to performance issues in production applications.
- **Async (Non-blocking):** Asynchronous file operations allow the event loop to continue running while waiting for the operation to complete, improving scalability and responsiveness.

```javascript
const fs = require('fs');

// Synchronous (Blocking) - blocks the event loop
console.log('1');
const result = fs.readFileSync('./contacts.txt', 'utf8');
console.log(result);
console.log('2');
// Output: 1, [file contents], 2

// Asynchronous (Non-blocking) - doesn't block the event loop
console.log('1');
fs.readFile('./contacts.txt', 'utf8', (err, result) => {
    if (err) throw err;
    console.log(result);
});
console.log('2');
// Output: 1, 2, [file contents]
```

#### File Writing Operations

```javascript
// Synchronous write
fs.writeFileSync('./file.txt', 'Hello Write Sync');

// Asynchronous write
fs.writeFile('./file.txt', 'Hello Write Async', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});
```

> Note: Synchronous operations block the event loop, which can lead to performance issues in production applications. Use asynchronous methods for better scalability and responsiveness.

### 2.3 Building HTTP Server in Node.js

Creating HTTP servers is fundamental to Node.js web development. The built-in `http` module allows you to create servers that can handle HTTP requests and responses.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    // Set response headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send response
    res.end('Hello from Node.js Server!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### 2.4 Handling URLs

URL handling involves parsing request URLs and routing them to appropriate handlers.

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === '/') {
        res.end('Home Page');
    } else if (path === '/about') {
        res.end(`About Page - Hello ${query.name || 'Guest'}`);
    } else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

server.listen(3000);
```

### 2.5 HTTP Methods

HTTP methods define the type of action to be performed on a resource or data. They are essential for RESTful APIs and web applications.

- **GET**: Retrieve data from the server (read-only).
- **POST**: Submit data to the server to create a resource.
- **PUT**: Update or replace existing data on the server completely.
- **PATCH**: Partially update existing data on the server.
- **DELETE**: Remove resource or data from the server.
- **HEAD**: Similar to GET, but only retrieves headers not the body.
- **OPTIONS**: Retrieve supported HTTP methods for a resource.

### 2.6 Versioning in Node.js

Node.js follows semantic versioning (SemVer) with the format `MAJOR.MINOR.PATCH`. 

- Format: MAJOR.MINOR.PATCH (e.g., 1.2.3)
- `^1.2.3`: Compatible with 1.x.x
- `~1.2.3`: Compatible with 1.2.x

| Part      | Meaning                                     | Example change  |
| --------- | ------------------------------------------- | --------------- |
| **MAJOR** | Breaking changes (incompatible API changes) | `1.0.0 → 2.0.0` |
| **MINOR** | New features, backward-compatible           | `1.2.0 → 1.3.0` |
| **PATCH** | Bug fixes, backward-compatible              | `1.2.3 → 1.2.4` |

Node.js releases:
- **LTS (Long Term Support)**: Even-numbered versions (18, 20, 22) - recommended for production
- **Current**: Latest features with shorter support cycles

### 2.7 Node.js Package Manager (npm)
npm (Node Package Manager) is the default package manager for Node.js, used to install, update, and manage third-party packages and libraries. It provides a vast ecosystem of reusable code, making it easy to add functionality to your Node.js applications.

#### Installing Packages
To install a package, use the following command:

```bash
npm install <package-name>
```

#### Creating a package.json File
To create a `package.json` file, which contains metadata about your project and its dependencies, run:

```bash
npm init -y
```

#### Installing, Updating, and Removing Packages
You can manage packages using npm commands:

```bash
npm install express
npm update express
npm uninstall express
```

#### Installing specific package versions
To install a specific version of a package, you can specify the version number:
```bash
npm install express@4.18.2
```

#### Using npx (Node Package eXecute)
npx is a package runner tool that comes with npm 5.2+ and allows you to execute packages without installing them globally. This is useful for running command-line tools or scripts locally without cluttering your global namespace.

```bash
npx create-react-app my-app
```

## 3. Express.js and APIs

### 3.1 Getting Started with Express

Express.js is a minimal and flexible Node.js web application framework that simplifies building web applications and APIs.

#### Problem with Vanilla Node.js

Vanilla Node.js requires a lot of boilerplate code for routing, middleware, and handling requests/responses. Express.js abstracts these complexities and simplifies the process of creating server-side applications with Node.js. There is no need to create the server from scratch, handle routing manually, or manage middleware.

#### Installation and Basic Setup

```bash
npm init -y
npm install express
```

#### Setting Up a Web Server in Express.js

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### 3.2 What is RESTful API?

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use standard HTTP methods and are stateless, scalable, and simple to understand.

#### Key Principles of REST

- **Stateless**: Each request contains all necessary information
- **Client-Server Architecture**: Separation of concerns
- **Uniform Interface**: Standard HTTP methods and resource identification
- **Cacheable**: Responses should define cacheability

### 3.3 Building REST APIs with Node.js + Express

```javascript
const express = require('express');
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sample data
let users = [
    { id: 1, name: 'Deepak Modi', email: 'deepak@gmail.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
```

#### Running an Express Server

- Install Express using `npm install express`.
- Create a file named `index.js` and add the Express server code.
- Add `"start": "node index.js"` or `"dev": "nodemon index.js"` to your `package.json` scripts section to easily run your server.
- Run commands like `npm start` or `npm run dev` to start your Express server.
- Use `nodemon` for automatic server restarts during development by installing it globally with `npm install -g nodemon` or locally with `npm install --save-dev nodemon` as a dev dependency in your project.

#### Tools for Testing REST APIs

- **Postman:** A popular tool for testing APIs with a user-friendly interface.
- **cURL:** A command-line tool for making HTTP requests.
- **Insomnia:** Another user-friendly API testing tool.

#### Best Practices for Designing REST APIs

- Use meaningful resource names (nouns) in URIs.
- Use appropriate HTTP methods for actions (GET for read, POST for create, PUT/PATCH for update, DELETE for delete).
- Use status codes to indicate success or failure (e.g., 200 OK, 201 Created, 404 Not Found).

### 3.4 Express Middleware

Middleware functions execute during the request-response cycle and can modify request/response objects, end the request-response cycle, or call the next middleware.

#### Types of Middleware

```javascript
// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Router-level middleware
app.use('/api', apiRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

### 3.5 HTTP Headers in APIs

HTTP headers provide additional information about the request or response.

```javascript
app.get('/api/users', (req, res) => {
    // Set response headers
    res.set({
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    });
    
    // Access request headers
    const userAgent = req.get('User-Agent');
    const authorization = req.headers.authorization;
    
    res.json(users);
});
```

### 3.6 HTTP Status Codes

HTTP status codes indicate the result of the HTTP request:

#### Common Status Codes

- **2xx Success**
  - 200 OK: Request successful
  - 201 Created: Resource created successfully
  - 204 No Content: Request successful, no content to return

- **4xx Client Error**
  - 400 Bad Request: Invalid request
  - 401 Unauthorized: Authentication required
  - 403 Forbidden: Access denied
  - 404 Not Found: Resource not found

- **5xx Server Error**
  - 500 Internal Server Error: Server error
  - 503 Service Unavailable: Server temporarily unavailable

### 3.7 Introduction to POSTMAN

Postman is a popular API testing tool that allows you to test your REST APIs easily with a user-friendly interface.

#### Installing Postman
- Download Desktop app: [Postman Desktop](https://www.postman.com/downloads/)
- Use Postman Web: [Postman Web](https://www.postman.com/)
- Install VS Code extension: [Postman for VS Code](https://marketplace.visualstudio.com/items?itemName=postman.postman-for-vscode)

#### Using Postman for API Testing

1. **GET Request**: Test retrieving data
   - URL: `http://localhost:3000/api/users`
   - Method: GET

2. **POST Request**: Test creating data
   - URL: `http://localhost:3000/api/users`
   - Method: POST
   - Body: `{ "name": "Ranjit Barnwal", "email": "ranjit@gmail.com" }`

3. **PUT Request**: Test updating data
   - URL: `http://localhost:3000/api/users/1`
   - Method: PUT
   - Body: `{ "name": "Krishna Agarwal", "email": "krishna@example.com" }`

4. **DELETE Request**: Test deleting data
   - URL: `http://localhost:3000/api/users/1`
   - Method: DELETE

## 4. Database Integration

### 4.1 Introduction to MongoDB

MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. It's well-suited for Node.js applications due to its JavaScript-like syntax and scalability.

#### Why MongoDB with Node.js?

- **JSON-like Documents**: Natural fit with JavaScript objects
- **Flexible Schema**: Easy to modify data structure
- **Scalability**: Handles large amounts of data efficiently
- **Rich Query Language**: Powerful querying capabilities

#### MongoDB Concepts

- **Database**: Collection of collections
- **Collection**: Group of documents (similar to table in SQL)
- **Document**: Individual record (similar to row in SQL)
- **Field**: Key-value pair in document (similar to column in SQL)

### 4.2 Connecting Node.js with MongoDB (Mongoose + Express)

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, casting, and business logic hooks.

#### Installation and Setup

```bash
npm install mongoose
```

#### Basic Connection

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connection events
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});
```

#### Defining Schemas and Models

```javascript
// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
```

#### CRUD Operations with Mongoose

```javascript
const User = require('./models/User');

// Create user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 4.3 MVC Pattern in Node.js

MVC (Model-View-Controller) is an architectural pattern that separates application logic into three interconnected components.

#### MVC Structure

```
project/
├── models/
│   └── User.js
├── views/
│   └── users.ejs
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
└── app.js
```

#### Model (models/User.js)

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number
});

module.exports = mongoose.model('User', userSchema);
```

#### Controller (controllers/userController.js)

```javascript
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

#### Routes (routes/userRoutes.js)

```javascript
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
```

#### Main App (app.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

This MVC structure provides better organization, maintainability, and separation of concerns in your Node.js applications.