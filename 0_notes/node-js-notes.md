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
   - [3.5 HTTP Status Codes](#35-http-status-codes)
   - [3.6 HTTP Headers in APIs](#36-http-headers-in-apis)
   - [3.7 Introduction to POSTMAN](#37-introduction-to-postman)

4. [Database Integration](#4-database-integration)

   - [4.1 Introduction to MongoDB](#41-introduction-to-mongodb)
   - [4.2 Connecting Node.js with MongoDB (Mongoose + Express)](#42-connecting-nodejs-with-mongodb-mongoose--express)
   - [4.3 MVC Pattern in Node.js](#43-mvc-pattern-in-nodejs)

5. [Authentication and Authorization](#5-authentication-and-authorization)

   - [5.1 Authentication Methods](#51-authentication-methods)
   - [5.2 Session-based Authentication](#52-session-based-authentication)
   - [5.3 JWT (JSON Web Tokens)](#53-jwt-json-web-tokens)
   - [5.4 OAuth 2.0 Integration](#54-oauth-20-integration)
   - [5.5 Authorization and Role-based Access Control](#55-authorization-and-role-based-access-control)

6. [Projects and Applications](#6-projects-and-applications)

   - [6.1 URL Shortener (Node.js + MongoDB)](#61-url-shortener-nodejs--mongodb)
   - [6.2 Blog Application (Node.js, MongoDB, EJS)](#62-blog-application-nodejs-mongodb-ejs)
     - [6.2.1 Setting up the project](#621-setting-up-the-project)
     - [6.2.2 Setting up authentication](#622-setting-up-authentication)
     - [6.2.3 Complete app structure](#623-complete-app-structure)
   - [6.3 Discord Bot in Node.js](#63-discord-bot-in-nodejs)
   - [6.4 File Uploads with Multer](#64-file-uploads-with-multer)

7. [Deployment & Performance](#7-deployment--performance)

   - [7.1 AWS Deployment](#71-aws-deployment)
   - [7.2 NGINX (Setup, Serve Static Content, SSL with LetsEncrypt)](#72-nginx-setup-serve-static-content-ssl-with-letsencrypt)
   - [7.3 Scaling Node.js with Cluster](#73-scaling-nodejs-with-cluster)
   - [7.4 Serverless Framework + AWS Lambda](#74-serverless-framework--aws-lambda)

8. [Real-time and Streams](#8-real-time-and-streams)

   - [8.1 WebSocket with Socket.IO](#81-websocket-with-socketio)
   - [8.2 Node.js Streams](#82-nodejs-streams)

9. [GraphQL with Node.js](#9-graphql-with-nodejs)
   - [9.1 GraphQL Crash Course](#91-graphql-crash-course)
   - [9.2 Setting up GraphQL Server](#92-setting-up-graphql-server)
   - [9.3 Prisma + PostgreSQL Setup](#93-prisma--postgresql-setup)
   - [9.4 Refactoring GraphQL Code](#94-refactoring-graphql-code)
   - [9.5 Authentication + JWT in GraphQL](#95-authentication--jwt-in-graphql)

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
let users = [{ id: 1, name: 'Deepak Modi', email: 'deepak@gmail.com' }];

// GET all users
app.get('/api/users', (req, res) => {
	res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
	const user = users.find((u) => u.id === parseInt(req.params.id));
	if (!user) return res.status(404).json({ message: 'User not found' });
	res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
	const newUser = {
		id: users.length + 1,
		name: req.body.name,
		email: req.body.email,
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
	const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
	if (userIndex === -1)
		return res.status(404).json({ message: 'User not found' });

	users[userIndex] = { ...users[userIndex], ...req.body };
	res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
	const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
	if (userIndex === -1)
		return res.status(404).json({ message: 'User not found' });

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
- Use middleware for common tasks like authentication, logging, and error handling.

### 3.4 Express Middleware

Middleware functions are functions that execute during the request-response cycle in Express.js. They can modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

These functions run before the final request handler and can be used for tasks like logging, authentication, parsing request bodies, and error handling.

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
### 3.5 HTTP Status Codes

HTTP status codes indicate the result of an HTTP request. They are grouped into five categories:
- **1xx Informational**: Request received, continuing process
- **2xx Success**: The request was successfully received, understood, and accepted
- **3xx Redirection**: Further action needs to be taken to complete the request
- **4xx Client Error**: The request contains bad syntax or cannot be fulfilled
- **5xx Server Error**: The server failed to fulfill a valid request

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

> Always return a appropriate status code with the response to indicate the result of the request. 

### 3.6 HTTP Headers in APIs

HTTP headers provide additional information about the request or response. They are key-value pairs sent between the client and server, allowing for metadata exchange.

```javascript
app.get('/api/users', (req, res) => {
	// Set response headers
	res.set({
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node.js',
	});

	// Access request headers
	const userAgent = req.get('User-Agent');
	const authorization = req.headers.authorization;

	res.json(users);
});
```
#### Common built-in HTTP Headers
- **Content-Type**: Indicates the media type of the resource (e.g., `application/json`, `text/html`).
- **Authorization**: Contains credentials for authenticating the client.
- **Cache-Control**: Directives for caching mechanisms in both requests and responses.
- **User-Agent**: Information about the client application making the request.

#### Custom Headers

Custom headers can be added to requests and responses to provide additional context or metadata. They should follow the naming convention of `X-` prefix to avoid conflicts with standard headers.

```javascript
app.get('/api/users', (req, res) => {
	res.set('X-Custom-Header', 'CustomValue');
	res.json(users);
});
```

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

MongoDB uses the lightweight and flexible BSON (Binary JSON), an extension JSON, to maximize efficiency.

#### Why MongoDB with Node.js?

- **JSON-like Documents**: Natural fit with JavaScript objects
- **Flexible Schema**: Easy to modify data structure
- **Scalability**: Handles large amounts of data efficiently
- **Rich Query Language**: Powerful querying capabilities

#### Installation and Setup of MongoDB
- **Windows/Mac/Linux**: Download from [mongodb.com](https://www.mongodb.com/try/download/community).

> For step-by-step installation, refer to this blog: [How to Install MongoDB on Windows](https://deepakmodi.hashnode.dev/how-to-install-mongodb-with-mongosh-on-windows-manually)


#### MongoDB Concepts

- **Database**: Collection of collections
- **Collection**: Group of documents (similar to table in SQL)
- **Document**: Individual record (similar to row in SQL)
- **Field**: Key-value pair in document (similar to column in SQL)

### 4.2 Connecting Node.js with MongoDB (Mongoose + Express)

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema validation, casting, and business logic hooks.

#### Installation of Mongoose
To use Mongoose, you need to install it in your Node.js project:
```bash
npm install mongoose
```

#### Basic Connection

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
```

#### Defining Schemas and Models

```javascript
// User schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	age: {
		type: Number,
		min: 0,
		max: 120,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
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
		const user = new User(req.body); // create user object
		await user.save(); // save in database
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
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
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
A typical MVC structure in Node.js might look like this:

```
project/
├── models/
│   └── User.js             →  Schema and model
├── views/
│   └── users.ejs           →  Templating engine (EJS, Pug, etc.)
│   └── index.html          →  Static HTML
├── controllers/
│   └── userController.js   →  All logic (CRUD)
├── routes/
│   └── userRoutes.js       →  API endpoints
└── app.js                  →  Main file (connect, setup)
```

#### Model (models/User.js)
The model handles data and database interactions. 

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: Number,
});

module.exports = mongoose.model('User', userSchema);
```

#### Controller (controllers/userController.js)
The controller contains the logic for handling requests and responses.

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

#### View (views/users.ejs)
The view is responsible for rendering the user interface. For web apps, you might use templating engines like EJS, Pug, or Handlebars. For REST APIs serving JSON to frontend frameworks like React/Next.js, views are typically handled on the frontend.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Users</title>
</head>
<body>
	<h1>Users List</h1>
	<ul>
		<% users.forEach(user => { %>
			<li><%= user.name %> - <%= user.email %></li>
		<% }) %>
	</ul>
</body>
</html>
```

#### Routes (routes/userRoutes.js)
The routes define the endpoints and map them to controller functions.

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
The entry point of the application sets up the server, connects to the database, and uses the routes.

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

## 5. Authentication and Authorization

Authentication and authorization are crucial security components in web applications. Authentication verifies user identity, while authorization determines what resources users can access based on their permissions.

### 5.1 Authentication Methods

Authentication is the process of verifying who a user is. There are several methods to implement authentication in Node.js applications:
- **Password-based Authentication**: Storing user credentials (username/email and password) securely in database.
- **Session-based Authentication (Stateful)**: Storing user information on the server and using cookies to maintain state.
- **Token-based Authentication (Stateless)**: Using tokens (like JWT) to authenticate users without maintaining server-side state.
- **OAuth Authentication**: Using third-party services (like Google, GitHub, Facebook) to authenticate users.

#### Password-based Authentication

The most simple authentication method is by storing username/email and password securely in the database. Passwords should be hashed before storing them to enhance security.

```javascript
const bcrypt = require('bcryptjs'); // hashing algorithm
const User = require('../models/User');

// Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password' });
        }
        
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

### 5.2 Session-based Authentication

Session-based authentication stores user information on the server and uses cookies (session ID) to maintain state. 

#### Installing Session Dependencies

```bash
npm install express-session connect-mongo
```

#### Session Implementation

```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/your-app'
    }),
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Login with sessions
const loginWithSession = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Store user info in session
        req.session.userId = user._id;
        req.session.username = user.username;
        
        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Session middleware for protecting routes
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Please log in to access this resource' });
    }
    next();
};

// Logout
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
```

### 5.3 JWT (JSON Web Tokens)

JWT is a stateless authentication method that encodes user information in a token. It's ideal for APIs and distributed systems.

#### Installing JWT Dependencies

```bash
npm install jsonwebtoken
```

#### JWT Implementation

```javascript
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Login with JWT
const loginWithJWT = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Generate token
        const token = generateToken(user._id);
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// JWT Middleware for protecting routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// Protected route example
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 5.4 OAuth 2.0 Integration

OAuth allows users to authenticate using third-party services like Google, GitHub, or Facebook.

#### Installing OAuth Dependencies

```bash
npm install passport passport-google-oauth20 passport-local express-session
```

#### Google OAuth Example

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google OAuth configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
            return done(null, user);
        }
        
        // Create new user
        user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
        });
        
        await user.save();
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// OAuth routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard'); // Successful authentication
    }
);
```

### 5.5 Authorization and Role-based Access Control

Authorization determines what authenticated users can access based on their roles and permissions.

#### Role-based Authorization

```javascript
// User model with roles
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    permissions: [{
        type: String,
        enum: ['read', 'write', 'delete', 'manage_users']
    }]
});

// Authorization middleware
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        next();
    };
};

// Permission-based authorization
const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({ message: `${permission} permission required` });
        }
        
        next();
    };
};

// Protected routes with role-based access
app.get('/api/admin/users', 
    authenticateToken, 
    authorize(['admin']), 
    async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

app.delete('/api/posts/:id', 
    authenticateToken, 
    checkPermission('delete'), 
    async (req, res) => {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Resource-based authorization (users can only edit their own posts)
const checkResourceOwnership = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if (post.author.toString() !== req.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        req.post = post;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

app.put('/api/posts/:id', 
    authenticateToken, 
    checkResourceOwnership, 
    async (req, res) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true }
            );
            res.json(updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);
```

## 6. Projects and Applications

### 6.1 URL Shortener (Node.js + MongoDB)

A URL shortener is a simple web application that converts long URLs into shorter, more manageable links. It typically involves generating a unique identifier for each URL and storing the mapping in a database.

#### Features

- Shorten a long URL
- Redirect to the original URL when the short link is accessed
- Track the number of clicks on each short link
- Optionally, allow custom aliases for short links

#### Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database to store URL mappings
- **Mongoose**: ODM library for MongoDB and Node.js
- **Nodemon**: Development tool for automatic server restarts

#### Project Structure

```
url-shortener/
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
├── controllers/
│   └── urlController.js
├── public/
│   └── index.html
├── app.js
└── package.json
```

#### Setting Up the Project

1. **Initialize Node.js Project**

   ```bash
   mkdir url-shortener
   cd url-shortener
   npm init -y
   ```

2. **Install Dependencies**

   ```bash
   npm install express mongoose
   npm install --save-dev nodemon
   ```

3. **Create Project Structure**

   ```bash
   mkdir models routes controllers public
   touch app.js
   ```

4. **Define URL Model (models/Url.js)**

   ```javascript
   const mongoose = require('mongoose');

   const urlSchema = new mongoose.Schema({
   	originalUrl: { type: String, required: true },
   	shortCode: { type: String, required: true, unique: true },
   	clicks: { type: Number, default: 0 },
   });

   module.exports = mongoose.model('Url', urlSchema);
   ```

5. **Create URL Controller (controllers/urlController.js)**

   ```javascript
   const Url = require('../models/Url');

   exports.shortenUrl = async (req, res) => {
   	const { originalUrl } = req.body;
   	const shortCode = Math.random()       // 0.7834592847563
                        .toString(36)     // "0.s8w7xqp4zk"
                        .substring(2, 8); // "s8w7xq"

   	try {
   		const url = new Url({ originalUrl, shortCode });
   		await url.save();
   		res.status(201).json(url);
   	} catch (error) {
   		res.status(400).json({ error: error.message });
   	}
   };

   exports.redirectUrl = async (req, res) => {
   	const { shortCode } = req.params;

   	try {
   		const url = await Url.findOne({ shortCode });
   		if (!url) return res.status(404).send('URL not found');

   		url.clicks++;
   		await url.save();

   		res.redirect(url.originalUrl);
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };
   ```

6. **Define URL Routes (routes/urlRoutes.js)**

   ```javascript
   const express = require('express');
   const urlController = require('../controllers/urlController');

   const router = express.Router();

   router.post('/shorten', urlController.shortenUrl);
   router.get('/:shortCode', urlController.redirectUrl);

   module.exports = router;
   ```

7. **Set Up Express Server (app.js)**

   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const urlRoutes = require('./routes/urlRoutes');

   const app = express();

   // Middleware
   app.use(express.json());
   app.use(express.static('public'));

   // Routes
   app.use('/api/urls', urlRoutes);

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/urlshortener')
   	.then(() => console.log('MongoDB Connected'))
   	.catch((err) => console.error('MongoDB connection error:', err));

   app.listen(3000, () => {
   	console.log('Server running on port 3000');
   });
   ```

8. **Create Frontend Form (public/index.html)**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>URL Shortener</title>
   	</head>
   	<body>
   		<h1>URL Shortener</h1>
   		<form id="urlForm">
   			<input
   				type="text"
   				id="originalUrl"
   				placeholder="Enter URL to shorten"
   				required
   			/>
   			<button type="submit">Shorten</button>
   		</form>
   		<div id="result"></div>

   		<script>
   			document
   				.getElementById('urlForm')
   				.addEventListener('submit', async (e) => {
   					e.preventDefault();
   					const originalUrl = document.getElementById('originalUrl').value;

   					const response = await fetch('/api/urls/shorten', {
   						method: 'POST',
   						headers: {
   							'Content-Type': 'application/json',
   						},
   						body: JSON.stringify({ originalUrl }),
   					});
					const data = await response.json();
					if (response.ok) {
						document.getElementById(
							'result'
						).innerHTML = `Short URL: <a href="/api/urls/${data.shortCode}">${data.shortCode}</a>`;
					} else {
						document.getElementById(
							'result'
						).innerHTML = `Error: ${data.error}`;
					}
   				});
   		</script>
   	</body>
   </html>
   ```

9. **Run the Application**

   ```bash
   npm run dev
   ```

10. **Test the URL Shortener**

- Open your browser and go to `http://localhost:3000`.
- Enter a long URL and click "Shorten".
- Copy the short URL and test the redirection.

### 6.2 Blog Application (Node.js, MongoDB, EJS)

A blog application is a web application that allows users to create, read, update, and delete blog posts. It typically includes user authentication, a rich text editor for writing posts, and a comment system.

#### Features

- User registration and authentication
- Create, edit, delete blog posts
- Rich text editor for formatting posts
- Comment system for readers to leave feedback
- Categorize posts by topics
- Search functionality to find posts

#### Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database to store blog posts and user data
- **Mongoose**: ODM library for MongoDB and Node.js
- **jwt**: JSON Web Tokens for user authentication
- **EJS**: Templating engine to render HTML views
- **Nodemon**: Development tool for automatic server restarts

#### Project Structure

```
blog-app/
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
├── controllers/
│   ├── userController.js
│   └── postController.js
├── views/
│   ├── partials/
│   │   └── header.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   └── post.ejs
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── scripts.js
├── app.js
└── package.json
```

#### Setting Up the Project

1. **Initialize Node.js Project**

   ```bash
   mkdir blog-app
   cd blog-app
   npm init -y
   ```

2. **Install Dependencies**

   ```bash
   npm install express mongoose ejs bcryptjs jsonwebtoken
   npm install --save-dev nodemon
   ```

3. **Create Project Structure**

   ```bash
   mkdir models routes controllers views public
   mkdir public/css public/js views/partials
   touch app.js
   ```

4. **Define User and Post Models (models/User.js, models/Post.js)**

   ```javascript
   // models/User.js
   const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');

   const userSchema = new mongoose.Schema({
   	username: { type: String, required: true, unique: true },
   	email: { type: String, required: true, unique: true },
   	password: { type: String, required: true },
   });

   // Hash password before saving
   userSchema.pre('save', async function (next) {
   	if (!this.isModified('password')) return next();
   	this.password = await bcrypt.hash(this.password, 10);
   	next();
   });

   module.exports = mongoose.model('User', userSchema);
   ```

   ```javascript
   // models/Post.js
   const mongoose = require('mongoose');

   const postSchema = new mongoose.Schema({
   	title: { type: String, required: true },
   	content: { type: String, required: true },
   	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   	createdAt: { type: Date, default: Date.now },
   	updatedAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('Post', postSchema);
   ```

5. **Create User and Post Controllers (controllers/userController.js, controllers/postController.js)**

   ```javascript
   // controllers/userController.js
   const User = require('../models/User');

   exports.register = async (req, res) => {
   	const { username, email, password } = req.body;

   	try {
   		const user = new User({ username, email, password });
   		await user.save();
   		res.status(201).json({ message: 'User registered successfully' });
   	} catch (error) {
   		res.status(400).json({ error: error.message });
   	}
   };

   exports.login = async (req, res) => {
   	const { email, password } = req.body;

   	try {
   		const user = await User.findOne({ email });
   		if (!user) return res.status(404).json({ message: 'User not found' });

   		// Check password
   		const isMatch = await bcrypt.compare(password, user.password);
   		if (!isMatch)
   			return res.status(400).json({ message: 'Invalid credentials' });

   		// Generate JWT
   		const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
   			expiresIn: '1h',
   		});
   		res.json({ token });
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };
   ```

   ```javascript
   // controllers/postController.js
   const Post = require('../models/Post');

   exports.createPost = async (req, res) => {
   	const { title, content } = req.body;
   	const author = req.user.id; // Get author from JWT

   	try {
   		const post = new Post({ title, content, author });
   		await post.save();
   		res.status(201).json(post);
   	} catch (error) {
   		res.status(400).json({ error: error.message });
   	}
   };

   exports.getAllPosts = async (req, res) => {
   	try {
   		const posts = await Post.find().populate('author', 'username');
   		res.json(posts);
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };

   exports.getPostById = async (req, res) => {
   	const { id } = req.params;

   	try {
   		const post = await Post.findById(id).populate('author', 'username');
   		if (!post) return res.status(404).json({ message: 'Post not found' });
   		res.json(post);
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };

   exports.updatePost = async (req, res) => {
   	const { id } = req.params;
   	const { title, content } = req.body;

   	try {
   		const post = await Post.findByIdAndUpdate(
   			id,
   			{ title, content, updatedAt: Date.now() },
   			{ new: true, runValidators: true }
   		);
   		if (!post) return res.status(404).json({ message: 'Post not found' });
   		res.json(post);
   	} catch (error) {
   		res.status(400).json({ error: error.message });
   	}
   };

   exports.deletePost = async (req, res) => {
   	const { id } = req.params;

   	try {
   		const post = await Post.findByIdAndDelete(id);
   		if (!post) return res.status(404).json({ message: 'Post not found' });
   		res.status(204).send();
   	} catch (error) {
   		res.status(500).json({ error: error.message });
   	}
   };
   ```

6. **Define User and Post Routes (routes/userRoutes.js, routes/postRoutes.js)**

   ```javascript
   // routes/userRoutes.js
   const express = require('express');
   const userController = require('../controllers/userController');

   const router = express.Router();

   router.post('/register', userController.register);
   router.post('/login', userController.login);

   module.exports = router;
   ```

   ```javascript
   // routes/postRoutes.js
   const express = require('express');
   const postController = require('../controllers/postController');
   const authMiddleware = require('../middleware/authMiddleware');

   const router = express.Router();

   // Protect all post routes
   router.use(authMiddleware);

   router.post('/', postController.createPost);
   router.get('/', postController.getAllPosts);
   router.get('/:id', postController.getPostById);
   router.put('/:id', postController.updatePost);
   router.delete('/:id', postController.deletePost);

   module.exports = router;
   ```

7. **Create Authentication Middleware (middleware/authMiddleware.js)**

   ```javascript
   const jwt = require('jsonwebtoken');
   const User = require('../models/User');

   module.exports = async (req, res, next) => {
   	const token = req.headers['authorization']?.split(' ')[1];
   	if (!token) return res.status(401).json({ message: 'Unauthorized' });

   	try {
   		const decoded = jwt.verify(token, 'your_jwt_secret');
   		req.user = await User.findById(decoded.id);
   		next();
   	} catch (error) {
   		res.status(401).json({ message: 'Invalid or expired token' });
   	}
   };
   ```

8. **Set Up Express Server (app.js)**

   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const userRoutes = require('./routes/userRoutes');
   const postRoutes = require('./routes/postRoutes');

   const app = express();

   // Middleware
   app.use(express.json());
   app.use(express.static('public'));

   // Routes
   app.use('/api/users', userRoutes);
   app.use('/api/posts', postRoutes);

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/blogapp')
   	.then(() => console.log('MongoDB Connected'))
   	.catch((err) => console.error('MongoDB connection error:', err));

   app.listen(3000, () => {
   	console.log('Server running on port 3000');
   });
   ```

9. **Create Views and Static Files**

   - Create EJS views in the `views` folder for different pages (e.g., index, login, register, dashboard, post).
   - Create CSS styles in `public/css/styles.css` and JS scripts in `public/js/scripts.js`.

10. **Run the Application**

    ```bash
    npm run dev
    ```

11. **Test the Blog Application**

    - Open your browser and go to `http://localhost:3000`.
    - Register a new user and log in.
    - Create, edit, and delete blog posts.
    - Test the comment system and other features.

### 6.3 Discord Bot in Node.js

A Discord bot is a program that interacts with the Discord API to automate tasks, provide information, or entertain users on Discord servers. Discord bots can perform a wide range of functions, from moderating servers to playing music or providing game stats.

#### Features

- Respond to user commands
- Send automated messages or alerts
- Moderate chat (e.g., mute, kick, ban users)
- Provide information (e.g., weather, news, game stats)
- Play music in voice channels
- Customizable prefixes and command handling

#### Technologies Used

- **Node.js**: Backend runtime environment
- **Discord.js**: Powerful library to interact with the Discord API
- **Nodemon**: Development tool for automatic server restarts

#### Project Structure

```
discord-bot/
├── commands/
│   ├── ping.js
│   └── ban.js
├── events/
│   ├── ready.js
│   └── message.js
├── config.json
├── index.js
└── package.json
```

#### Setting Up the Project

1. **Initialize Node.js Project**

   ```bash
   mkdir discord-bot
   cd discord-bot
   npm init -y
   ```

2. **Install Dependencies**

   ```bash
   npm install discord.js
   npm install --save-dev nodemon
   ```

3. **Create Project Structure**

   ```bash
   mkdir commands events
   touch index.js
   ```

4. **Create Bot Configuration (config.json)**

   ```json
   {
   	"token": "YOUR_BOT_TOKEN",
   	"prefix": "!"
   }
   ```

5. **Set Up Bot Client (index.js)**

   ```javascript
   const { Client, Intents } = require('discord.js');
   const fs = require('fs');
   const path = require('path');
   const config = require('./config.json');

   const client = new Client({
   	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
   });

   // Load commands
   client.commands = new Map();
   const commandFiles = fs
   	.readdirSync(path.join(__dirname, 'commands'))
   	.filter((file) => file.endsWith('.js'));
   for (const file of commandFiles) {
   	const command = require(`./commands/${file}`);
   	client.commands.set(command.data.name, command);
   }

   // Load events
   const eventFiles = fs
   	.readdirSync(path.join(__dirname, 'events'))
   	.filter((file) => file.endsWith('.js'));
   for (const file of eventFiles) {
   	const event = require(`./events/${file}`);
   	client.on(event.name, (...args) => event.execute(...args, client));
   }

   client.login(config.token);
   ```

6. **Create Command Example (commands/ping.js)**

   ```javascript
   const { SlashCommandBuilder } = require('@discordjs/builders');

   module.exports = {
   	data: new SlashCommandBuilder()
   		.setName('ping')
   		.setDescription('Replies with Pong!'),
   	async execute(interaction) {
   		await interaction.reply('Pong!');
   	},
   };
   ```

7. **Create Event Example (events/ready.js)**

   ```javascript
   module.exports = {
   	name: 'ready',
   	once: true,
   	execute(client) {
   		console.log(`Logged in as ${client.user.tag}`);
   	},
   };
   ```

8. **Run the Bot**

   ```bash
   node index.js
   ```

9. **Test the Discord Bot**

   - Invite the bot to your Discord server using the OAuth2 URL generated in the Discord Developer Portal.
   - Test the bot commands and events in your Discord server.

### 6.4 File Uploads with Multer

Multer is a middleware for handling `multipart/form-data`, which is used for uploading files. It is written on top of the busboy library by Felix Geisendörfer.

#### Features

- Upload single or multiple files
- Limit file size and type
- Store files in memory or on disk
- Rename files during upload
- Handle file uploads in forms

#### Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **Multer**: Middleware for handling file uploads

#### Project Structure

```
file-upload/
├── uploads/
├── app.js
└── package.json
```

#### Setting Up the Project

1. **Initialize Node.js Project**

   ```bash
   mkdir file-upload
   cd file-upload
   npm init -y
   ```

2. **Install Dependencies**

   ```bash
   npm install express multer
   ```

3. **Create Project Structure**

   ```bash
   mkdir uploads
   touch app.js
   ```

4. **Set Up File Uploads with Multer (app.js)**

   ```javascript
   const express = require('express');
   const multer = require('multer');
   const path = require('path');

   const app = express();

   // Set up storage engine
   const storage = multer.diskStorage({
   	destination: './uploads',
   	filename: (req, file, cb) => {
   		cb(
   			null,
   			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
   		);
   	},
   });

   // Initialize upload variable
   const upload = multer({
   	storage,
   	limits: { fileSize: 1000000 }, // 1 MB limit
   	fileFilter: (req, file, cb) => {
   		const filetypes = /jpeg|jpg|png|gif/;
   		const extname = filetypes.test(
   			path.extname(file.originalname).toLowerCase()
   		);
   		const mimetype = filetypes.test(file.mimetype);

   		if (mimetype && extname) {
   			return cb(null, true);
   		}
   		cb(
   			'Error: File upload only supports the following filetypes - ' +
   				filetypes
   		);
   	},
   }).single('myImage'); // 'myImage' is the name attribute in the file input field

   app.post('/upload', (req, res) => {
   	upload(req, res, (err) => {
   		if (err) {
   			return res.status(400).send(err);
   		}
   		res.send(`File uploaded: ${req.file.filename}`);
   	});
   });

   app.listen(3000, () => {
   	console.log('Server running on port 3000');
   });
   ```

5. **Create Upload Form (public/index.html)**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>File Upload</title>
   	</head>
   	<body>
   		<h1>File Upload</h1>
   		<form id="uploadForm" enctype="multipart/form-data">
   			<input type="file" name="myImage" accept="image/*" required />
   			<button type="submit">Upload</button>
   		</form>
   		<div id="result"></div>

   		<script>
   			document
   				.getElementById('uploadForm')
   				.addEventListener('submit', async (e) => {
   					e.preventDefault();
   					const formData = new FormData();
   					const fileField = document.querySelector('input[type="file"]');

   					formData.append('myImage', fileField.files[0]);

   					const response = await fetch('/upload', {
   						method: 'POST',
   						body: formData,
   					});

   					const data = await response.text();
   					document.getElementById('result').innerText = data;
   				});
   		</script>
   	</body>
   </html>
   ```

6. **Run the Application**

   ```bash
   node app.js
   ```

7. **Test File Uploads**

   - Open your browser and go to `http://localhost:3000`.
   - Select an image file and click "Upload".
   - Check the `uploads` folder for the uploaded file.

## 7. Deployment & Performance

### 7.1 AWS Deployment

Deploying Node.js applications on AWS can be done using various services like EC2, Elastic Beanstalk, or Lambda (for serverless).

#### Deploying on EC2

1. **Launch an EC2 Instance**: Choose an Amazon Machine Image (AMI) with Node.js pre-installed or install Node.js manually on a basic Linux AMI.
2. **Connect to the Instance**: Use SSH to connect to your EC2 instance.
3. **Transfer Files**: Use SCP or SFTP to transfer your application files to the EC2 instance.
4. **Install Dependencies**: SSH into your instance and run `npm install` to install your app's dependencies.
5. **Start the Application**: Use `node` or `npm start` to start your application. Consider using a process manager like PM2 to keep your app running.
6. **Configure Security Group**: Ensure your EC2 instance's security group allows inbound traffic on the port your app is running (e.g., port 3000).
7. **Access the Application**: Open a browser and go to `http://<your-ec2-public-dns>:3000`.

#### Deploying on Elastic Beanstalk

1. **Package Your Application**: Ensure your application is working locally and create a ZIP file of your project.
2. **Create an Elastic Beanstalk Environment**: In the AWS Management Console, go to Elastic Beanstalk and create a new environment.
3. **Upload and Deploy**: Upload your ZIP file and deploy it to the Elastic Beanstalk environment.
4. **Configure Environment Variables**: Set any necessary environment variables in the Elastic Beanstalk console.
5. **Access the Application**: Once deployed, Elastic Beanstalk provides a URL to access your application.

### 7.2 NGINX (Setup, Serve Static Content, SSL with LetsEncrypt)

NGINX is a high-performance web server that can also be used as a reverse proxy, load balancer, and HTTP cache. It is often used to serve static content and as a reverse proxy for Node.js applications.

#### Installing NGINX

```bash
sudo apt update
sudo apt install nginx
```

#### Configuring NGINX

1. **Basic Configuration**: Edit the default configuration file

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   - Set the server name and root directory

   ```nginx
   server {
       listen 80;
       server_name your_domain.com;
       root /var/www/html;
       index index.html;
   }
   ```

2. **Reverse Proxy to Node.js**: If your Node.js app is running on a different port (e.g., 3000), set up a reverse proxy

   ```nginx
   location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

3. **Test and Restart NGINX**

   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### Serving Static Content

- Place your static files (HTML, CSS, JS) in the directory specified by the `root` directive in your NGINX configuration (e.g., `/var/www/html`).
- NGINX will automatically serve these files when requested.

#### SSL with LetsEncrypt

1. **Install Certbot**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain an SSL Certificate**

   ```bash
   sudo certbot --nginx -d your_domain.com
   ```

3. **Automatic Renewal**: Certbot sets up a cron job for automatic renewal. You can test the renewal process with:

   ```bash
   sudo certbot renew --dry-run
   ```

### 7.3 Scaling Node.js with Cluster

The Node.js cluster module allows you to create multiple child processes (workers) that share the same server port. This takes advantage of multi-core systems and improves the performance of Node.js applications.

#### Basic Usage

1. **Require the Cluster Module**

   ```javascript
   const cluster = require('cluster');
   const http = require('http');
   const numCPUs = require('os').cpus().length;
   ```

2. **Fork Workers**

   ```javascript
   if (cluster.isMaster) {
   	// Fork workers
   	for (let i = 0; i < numCPUs; i++) {
   		cluster.fork();
   	}

   	cluster.on('exit', (worker, code, signal) => {
   		console.log(`Worker ${worker.process.pid} died`);
   	});
   } else {
   	// Workers can share any TCP connection
   	// In this case, it is an HTTP server
   	http
   		.createServer((req, res) => {
   			res.writeHead(200);
   			res.end('Hello World\n');
   		})
   		.listen(8000);
   }
   ```

3. **Run the Application**

   ```bash
   node app.js
   ```

4. **Test the Clustered Application**

   - Send requests to the server and observe that multiple worker processes handle the requests.

### 7.4 Serverless Framework + AWS Lambda

Serverless computing allows you to build and run applications without having to manage servers. AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources.

#### Serverless Framework

The Serverless Framework is an open-source framework that simplifies the development and deployment of serverless applications.

1. **Install Serverless Framework**

   ```bash
   npm install -g serverless
   ```

2. **Create a Serverless Service**

   ```bash
   serverless create --template aws-nodejs --path my-service
   cd my-service
   ```

3. **Configure serverless.yml**

   ```yaml
   service: my-service

   provider:
     name: aws
     runtime: nodejs14.x

   functions:
     hello:
       handler: handler.hello
       events:
         - http:
             path: hello
             method: get
   ```

4. **Deploy the Service**

   ```bash
   serverless deploy
   ```

5. **Invoke the Function**

   ```bash
   serverless invoke -f hello
   ```

6. **View Logs**

   ```bash
   serverless logs -f hello
   ```

7. **Remove the Service**

   ```bash
   serverless remove
   ```

## 8. Real-time and Streams

### 8.1 WebSocket with Socket.IO

Socket.IO is a JavaScript library for real-time web applications. It enables real-time, bidirectional, and event-based communication between the browser and the server.

#### Features

- Real-time communication
- Automatic reconnection
- Room and namespace support
- Binary data support

#### Technologies Used

- **Node.js**: Backend runtime environment
- **Socket.IO**: Library for real-time communication

#### Project Structure

```
realtime-app/
├── public/
│   └── index.html
├── app.js
└── package.json
```

#### Setting Up the Project

1. **Initialize Node.js Project**

   ```bash
   mkdir realtime-app
   cd realtime-app
   npm init -y
   ```

2. **Install Dependencies**

   ```bash
   npm install express socket.io
   ```

3. **Create Project Structure**

   ```bash
   mkdir public
   touch app.js
   ```

4. **Set Up Express and Socket.IO (app.js)**

   ```javascript
   const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);

   app.get('/', (req, res) => {
   	res.sendFile(__dirname + '/public/index.html');
   });

   io.on('connection', (socket) => {
   	console.log('A user connected');

   	socket.on('disconnect', () => {
   		console.log('User disconnected');
   	});
   });

   server.listen(3000, () => {
   	console.log('Server running on port 3000');
   });
   ```

5. **Create Client-side Code (public/index.html)**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>Real-time App</title>
   	</head>
   	<body>
   		<h1>Real-time Communication with Socket.IO</h1>
   		<div id="messages"></div>
   		<input id="messageInput" placeholder="Type a message..." />
   		<button id="sendButton">Send</button>

   		<script src="/socket.io/socket.io.js"></script>
   		<script>
   			const socket = io();

   			const messagesDiv = document.getElementById('messages');
   			const messageInput = document.getElementById('messageInput');
   			const sendButton = document.getElementById('sendButton');

   			sendButton.addEventListener('click', () => {
   				const message = messageInput.value;
   				socket.emit('chat message', message);
   				messageInput.value = '';
   			});

   			socket.on('chat message', (msg) => {
   				const messageElement = document.createElement('div');
   				messageElement.textContent = msg;
   				messagesDiv.appendChild(messageElement);
   			});
   		</script>
   	</body>
   </html>
   ```

6. **Run the Application**

   ```bash
   node app.js
   ```

7. **Test Real-time Communication**

   - Open multiple browser windows and go to `http://localhost:3000`.
   - Send messages and observe real-time updates in all connected clients.

### 8.2 Node.js Streams

Streams are objects that allow you to read data from a source or write data to a destination in a continuous fashion. They are used for handling reading/writing files, network communications, or any kind of end-to-end information exchange.

#### Types of Streams

- **Readable Streams**: Streams from which data can be read (e.g., `fs.createReadStream()`).
- **Writable Streams**: Streams to which data can be written (e.g., `fs.createWriteStream()`).
- **Duplex Streams**: Streams that are both readable and writable (e.g., TCP sockets).
- **Transform Streams**: Duplex streams that can modify or transform the data as it is written and read (e.g., zlib compression streams).

#### Using Readable Streams

```javascript
const fs = require('fs');

// Create a readable stream
const readStream = fs.createReadStream('input.txt', 'utf8');

// Handle stream events
readStream.on('data', (chunk) => {
	console.log('Received chunk:', chunk);
});

readStream.on('end', () => {
	console.log('No more data in the stream.');
});

readStream.on('error', (err) => {
	console.error('Error:', err);
});
```

#### Using Writable Streams

```javascript
const fs = require('fs');

// Create a writable stream
const writeStream = fs.createWriteStream('output.txt');

// Write data to the stream
writeStream.write('Hello, ');
writeStream.write('world!\n');
writeStream.end('Goodbye, world!\n');

writeStream.on('finish', () => {
	console.log('All data has been written to the file.');
});

writeStream.on('error', (err) => {
	console.error('Error:', err);
});
```

#### Using Duplex and Transform Streams

```javascript
const { Transform } = require('stream');

// Create a transform stream
const reverseTransform = new Transform({
	transform(chunk, encoding, callback) {
		// Reverse the chunk and push it to the readable side
		this.push(chunk.toString().split('').reverse().join(''));
		callback();
	},
});

// Pipe readable stream through transform stream to writable stream
readStream.pipe(reverseTransform).pipe(writeStream);
```

## 9. GraphQL with Node.js

### 9.1 GraphQL Crash Course

GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. It provides a more efficient, powerful, and flexible alternative to the RESTful API.

#### Key Features of GraphQL

- **Declarative Data Fetching**: Clients can request exactly the data they need, reducing over-fetching and under-fetching of data.
- **Strongly Typed Schema**: GraphQL APIs are defined by a schema using the GraphQL Schema Definition Language (SDL). The schema specifies the types, queries, and mutations available in the API.
- **Single Endpoint**: Unlike REST, which exposes multiple endpoints for different resources, a GraphQL API typically exposes a single endpoint for all interactions.
- **Real-time Data with Subscriptions**: GraphQL supports real-time updates through subscriptions, allowing clients to receive live data updates.

#### GraphQL vs REST

- **Flexibility**: GraphQL allows clients to specify the structure of the response, while REST returns fixed data structures.
- **Efficiency**: GraphQL reduces the number of requests and the amount of data transferred over the network.
- **Versioning**: GraphQL APIs are typically versionless, as clients can request only the fields they need.

### 9.2 Setting up GraphQL Server

1. **Install Dependencies**

   ```bash
   npm install graphql express-graphql
   ```

2. **Create GraphQL Schema**

   ```javascript
   const {
   	GraphQLSchema,
   	GraphQLObjectType,
   	GraphQLString,
   } = require('graphql');

   // Define a simple User type
   const UserType = new GraphQLObjectType({
   	name: 'User',
   	fields: () => ({
   		id: { type: GraphQLString },
   		name: { type: GraphQLString },
   		email: { type: GraphQLString },
   	}),
   });

   // Define the RootQuery type
   const RootQuery = new GraphQLObjectType({
   	name: 'RootQueryType',
   	fields: {
   		user: {
   			type: UserType,
   			args: { id: { type: GraphQLString } },
   			resolve(parent, args) {
   				// Fetch data from the database or another source
   				return { id: args.id, name: 'John Doe', email: 'john@example.com' };
   			},
   		},
   	},
   });

   // Create the schema
   const schema = new GraphQLSchema({
   	query: RootQuery,
   });

   module.exports = schema;
   ```

3. **Set Up Express and GraphQL (app.js)**

   ```javascript
   const express = require('express');
   const { graphqlHTTP } = require('express-graphql');
   const schema = require('./schema');

   const app = express();

   app.use(
   	'/graphql',
   	graphqlHTTP({
   		schema,
   		graphiql: true, // Enable GraphiQL interface
   	})
   );

   app.listen(3000, () => {
   	console.log('Server running on port 3000');
   });
   ```

4. **Test the GraphQL Server**

   - Open your browser and go to `http://localhost:3000/graphql`.
   - Use the GraphiQL interface to test queries and mutations.

### 9.3 Prisma + PostgreSQL Setup

Prisma is a next-generation ORM for Node.js and TypeScript that simplifies database access and management. It provides a type-safe database client, migrations, and a powerful data modeling language.

1. **Install Dependencies**

   ```bash
   npm install prisma @prisma/client
   ```

2. **Initialize Prisma**

   ```bash
   npx prisma init
   ```

3. **Configure Database Connection**

   - Update the `DATABASE_URL` in the `.env` file to point to your PostgreSQL database.

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. **Define Data Model**

   - Update the `schema.prisma` file with your data model.

   ```prisma
   datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
   }

   generator client {
       provider = "prisma-client-js"
   }

   model User {
       id    String @id @default(cuid())
       name  String
       email String @unique
   }
   ```

5. **Run Migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

7. **Use Prisma Client in Your Application**

   ```javascript
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();

   async function main() {
   	// Create a new user
   	const newUser = await prisma.user.create({
   		data: {
   			name: 'Alice',
   			email: 'alice@example.com',
   		},
   	});
   	console.log('Created new user:', newUser);

   	// Fetch all users
   	const allUsers = await prisma.user.findMany();
   	console.log('All users:', allUsers);
   }

   main()
   	.catch((e) => console.error(e))
   	.finally(async () => {
   		await prisma.$disconnect();
   	});
   ```

8. **Run the Application**

   ```bash
   node app.js
   ```

9. **Test Prisma + PostgreSQL Integration**

   - Test creating and fetching users in your application.

### 9.4 Refactoring GraphQL Code

As your GraphQL schema and resolvers grow, it's important to keep your code organized and maintainable. Consider the following tips for refactoring GraphQL code:

1. **Modularize Schema and Resolvers**

   - Split your schema and resolvers into separate files and folders based on features or resources.

   ```
   graphql
   src/
   ├── graphql/
   │   ├── schema/
   │   │   ├── userSchema.js
   │   │   └── postSchema.js
   │   ├── resolvers/
   │   │   ├── userResolvers.js
   │   │   └── postResolvers.js
   │   └── index.js
   └── server.js
   ```

2. **Use GraphQL Modules**

   - Consider using the `graphql-modules` library to organize your schema and resolvers into cohesive modules.

   ```javascript
   const { createModule, gql } = require('graphql-modules');

   // Define the User module
   const UserModule = createModule({
   	id: 'user',
   	dirname: __dirname,
   	typeDefs: gql`
   		type User {
   			id: ID!
   			name: String!
   			email: String!
   		}

   		extend type Query {
   			user(id: ID!): User
   			users: [User!]!
   		}

   		extend type Mutation {
   			createUser(name: String!, email: String!): User!
   		}
   	`,
   	resolvers: {
   		Query: {
   			user: (parent, args, context, info) => {
   				// Resolver logic
   			},
   			users: (parent, args, context, info) => {
   				// Resolver logic
   			},
   		},
   		Mutation: {
   			createUser: (parent, args, context, info) => {
   				// Resolver logic
   			},
   		},
   	},
   });
   ```

3. **Use DataLoader for Batch Loading**

   - Use the `dataloader` library to batch and cache database or API calls in your resolvers.

   ```javascript
   const DataLoader = require('dataloader');

   const userLoader = new DataLoader(async (userIds) => {
       const users = await User.findByIds(userIds);
       return userIds.map(id => users.find(user => user.id === id));
   });

   // In your resolver
   const resolvers = {
       Post: {
           author: (post) => userLoader.load(post.authorId)
       }
   };
   ```

4. **Error Handling and Validation**

   ```javascript
   const { GraphQLError } = require('graphql');

   const resolvers = {
       Mutation: {
           createUser: async (parent, args, context) => {
               try {
                   // Validate input
                   if (!args.email) {
                       throw new GraphQLError('Email is required', {
                           extensions: { code: 'BAD_USER_INPUT' }
                       });
                   }

                   const user = await User.create(args);
                   return user;
               } catch (error) {
                   throw new GraphQLError('Failed to create user', {
                       extensions: { code: 'INTERNAL_ERROR' }
                   });
               }
           }
       }
   };
   ```

5. **Use GraphQL Tools for Schema Composition**

   ```javascript
   const { makeExecutableSchema } = require('@graphql-tools/schema');

   const typeDefs = `
       type Query {
           users: [User]
           posts: [Post]
       }
   `;

   const schema = makeExecutableSchema({
       typeDefs,
       resolvers
   });
   ```

### 9.5 Authentication + JWT in GraphQL

Authentication and authorization are crucial for securing GraphQL APIs. JSON Web Tokens (JWT) provide a stateless way to authenticate users and authorize access to resources.

#### Setting Up JWT Authentication

1. **Install Required Packages**

   ```bash
   npm install jsonwebtoken bcryptjs
   ```

2. **Create Authentication Utilities**

   ```javascript
   // utils/auth.js
   const jwt = require('jsonwebtoken');
   const bcrypt = require('bcryptjs');

   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
   const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

   // Generate JWT token
   const generateToken = (payload) => {
       return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
   };

   // Verify JWT token
   const verifyToken = (token) => {
       try {
           return jwt.verify(token, JWT_SECRET);
       } catch (error) {
           throw new Error('Invalid or expired token');
       }
   };

   // Hash password
   const hashPassword = async (password) => {
       const saltRounds = 10;
       return await bcrypt.hash(password, saltRounds);
   };

   // Compare password
   const comparePassword = async (password, hashedPassword) => {
       return await bcrypt.compare(password, hashedPassword);
   };

   module.exports = {
       generateToken,
       verifyToken,
       hashPassword,
       comparePassword
   };
   ```

3. **Update User Model with Authentication**

   ```javascript
   // models/User.js
   const mongoose = require('mongoose');
   const { hashPassword } = require('../utils/auth');

   const userSchema = new mongoose.Schema({
       username: {
           type: String,
           required: true,
           unique: true,
           trim: true
       },
       email: {
           type: String,
           required: true,
           unique: true,
           lowercase: true
       },
       password: {
           type: String,
           required: true,
           minlength: 6
       },
       role: {
           type: String,
           enum: ['USER', 'ADMIN'],
           default: 'USER'
       }
   }, { timestamps: true });

   // Hash password before saving
   userSchema.pre('save', async function(next) {
       if (!this.isModified('password')) return next();
       this.password = await hashPassword(this.password);
       next();
   });

   module.exports = mongoose.model('User', userSchema);
   ```

4. **Create Authentication Context**

   ```javascript
   // context/auth.js
   const { verifyToken } = require('../utils/auth');
   const User = require('../models/User');

   const getUser = async (req) => {
       const token = req.headers.authorization?.replace('Bearer ', '');
       
       if (!token) return null;

       try {
           const decoded = verifyToken(token);
           const user = await User.findById(decoded.userId);
           return user;
       } catch (error) {
           return null;
       }
   };

   module.exports = { getUser };
   ```

5. **Update GraphQL Schema with Authentication**

   ```javascript
   // schema/typeDefs.js
   const { gql } = require('apollo-server-express');

   const typeDefs = gql`
       type User {
           id: ID!
           username: String!
           email: String!
           role: Role!
           createdAt: String!
           updatedAt: String!
       }

       enum Role {
           USER
           ADMIN
       }

       type AuthPayload {
           token: String!
           user: User!
       }

       type Query {
           me: User
           users: [User!]! # Admin only
       }

       type Mutation {
           register(input: RegisterInput!): AuthPayload!
           login(input: LoginInput!): AuthPayload!
           updateProfile(input: UpdateProfileInput!): User!
       }

       input RegisterInput {
           username: String!
           email: String!
           password: String!
       }

       input LoginInput {
           email: String!
           password: String!
       }

       input UpdateProfileInput {
           username: String
           email: String
       }
   `;

   module.exports = typeDefs;
   ```

6. **Create Authentication Resolvers**

   ```javascript
   // resolvers/auth.js
   const { GraphQLError } = require('graphql');
   const User = require('../models/User');
   const { generateToken, comparePassword } = require('../utils/auth');

   const authResolvers = {
       Query: {
           me: async (parent, args, context) => {
               if (!context.user) {
                   throw new GraphQLError('You must be logged in', {
                       extensions: { code: 'UNAUTHENTICATED' }
                   });
               }
               return context.user;
           },

           users: async (parent, args, context) => {
               // Check if user is admin
               if (!context.user || context.user.role !== 'ADMIN') {
                   throw new GraphQLError('Access denied. Admin privileges required.', {
                       extensions: { code: 'FORBIDDEN' }
                   });
               }
               return await User.find();
           }
       },

       Mutation: {
           register: async (parent, { input }) => {
               try {
                   // Check if user already exists
                   const existingUser = await User.findOne({ 
                       $or: [{ email: input.email }, { username: input.username }]
                   });

                   if (existingUser) {
                       throw new GraphQLError('User with this email or username already exists', {
                           extensions: { code: 'BAD_USER_INPUT' }
                       });
                   }

                   // Create new user
                   const user = new User(input);
                   await user.save();

                   // Generate token
                   const token = generateToken({ userId: user.id });

                   return { token, user };
               } catch (error) {
                   throw new GraphQLError(error.message, {
                       extensions: { code: 'BAD_USER_INPUT' }
                   });
               }
           },

           login: async (parent, { input }) => {
               try {
                   // Find user by email
                   const user = await User.findOne({ email: input.email });

                   if (!user) {
                       throw new GraphQLError('Invalid email or password', {
                           extensions: { code: 'UNAUTHENTICATED' }
                       });
                   }

                   // Check password
                   const isPasswordValid = await comparePassword(input.password, user.password);

                   if (!isPasswordValid) {
                       throw new GraphQLError('Invalid email or password', {
                           extensions: { code: 'UNAUTHENTICATED' }
                       });
                   }

                   // Generate token
                   const token = generateToken({ userId: user.id });

                   return { token, user };
               } catch (error) {
                   throw new GraphQLError(error.message, {
                       extensions: { code: 'UNAUTHENTICATED' }
                   });
               }
           },

           updateProfile: async (parent, { input }, context) => {
               if (!context.user) {
                   throw new GraphQLError('You must be logged in', {
                       extensions: { code: 'UNAUTHENTICATED' }
                   });
               }

               try {
                   const updatedUser = await User.findByIdAndUpdate(
                       context.user.id,
                       input,
                       { new: true, runValidators: true }
                   );

                   return updatedUser;
               } catch (error) {
                   throw new GraphQLError('Failed to update profile', {
                       extensions: { code: 'BAD_USER_INPUT' }
                   });
               }
           }
       }
   };

   module.exports = authResolvers;
   ```

7. **Update Server with Authentication Context**

   ```javascript
   // server.js
   const { ApolloServer } = require('apollo-server-express');
   const express = require('express');
   const mongoose = require('mongoose');
   const typeDefs = require('./schema/typeDefs');
   const resolvers = require('./resolvers');
   const { getUser } = require('./context/auth');

   async function startServer() {
       const app = express();

       // Connect to MongoDB
       await mongoose.connect('mongodb://localhost:27017/graphql-auth');

       // Create Apollo Server
       const server = new ApolloServer({
           typeDefs,
           resolvers,
           context: async ({ req }) => {
               // Get user from token
               const user = await getUser(req);
               return { user };
           }
       });

       await server.start();
       server.applyMiddleware({ app });

       const PORT = process.env.PORT || 4000;
       app.listen(PORT, () => {
           console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
       });
   }

   startServer().catch(error => {
       console.error('Error starting server:', error);
   });
   ```

#### Testing Authentication

1. **Register a New User**

   ```graphql
   mutation {
       register(input: {
           username: "johndoe"
           email: "john@example.com"
           password: "password123"
       }) {
           token
           user {
               id
               username
               email
               role
           }
       }
   }
   ```

2. **Login**

   ```graphql
   mutation {
       login(input: {
           email: "john@example.com"
           password: "password123"
       }) {
           token
           user {
               id
               username
               email
           }
       }
   }
   ```

3. **Access Protected Resources**

   Add the JWT token to your request headers:
   ```
   {
       "Authorization": "Bearer your-jwt-token-here"
   }
   ```

   Then query protected resources:
   ```graphql
   query {
       me {
           id
           username
           email
           role
       }
   }
   ```

#### Best Practices for GraphQL Authentication

1. **Use HTTPS**: Always use HTTPS in production to protect tokens in transit
2. **Token Expiration**: Set appropriate token expiration times
3. **Refresh Tokens**: Implement refresh tokens for better security
4. **Rate Limiting**: Implement rate limiting to prevent brute force attacks
5. **Input Validation**: Always validate and sanitize user inputs
6. **Error Handling**: Don't expose sensitive information in error messages

#### Authorization Patterns

1. **Field-Level Authorization**

   ```javascript
   const resolvers = {
       User: {
           email: (user, args, context) => {
               // Only allow users to see their own email or admins to see all emails
               if (context.user.id === user.id || context.user.role === 'ADMIN') {
                   return user.email;
               }
               throw new GraphQLError('Access denied');
           }
       }
   };
   ```

2. **Directive-Based Authorization**

   ```javascript
   const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');

   function authDirectiveTransformer(schema, directiveName) {
       return mapSchema(schema, {
           [MapperKind.FIELD]: (fieldConfig, _fieldName, typeName) => {
               const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
               if (authDirective) {
                   const { requires } = authDirective;
                   const { resolve = defaultFieldResolver } = fieldConfig;
                   
                   fieldConfig.resolve = function(source, args, context, info) {
                       if (!context.user || context.user.role !== requires) {
                           throw new GraphQLError('Access denied');
                       }
                       return resolve(source, args, context, info);
                   };
               }
               return fieldConfig;
           }
       });
   }
   ```

This completes the comprehensive Node.js notes covering all topics from beginner to advanced levels, including the integration of GraphQL with authentication and JWT implementation. The notes now provide a complete learning path for mastering Node.js development!

---

*These Notes Were Compiled By Deepak Modi*		

*Website: [Deepak Modi](https://deepakmodi.tech)*	

*Connect with me on [LinkedIn](https://www.linkedin.com/in/deepakmodi1/) for more updates and resources!*