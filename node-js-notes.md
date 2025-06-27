# Node.js Comprehensive Notes for B.Tech CSE Students

---

## 1. Introduction to Node.js

### What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. Created by Ryan Dahl in 2009. Built on Google Chrome's V8 JavaScript engine, Node.js enables developers to build scalable, high-performance backend applications using JavaScript.

> Example: Backend of Netflix, LinkedIn, PayPal , Uber uses Node.js!

- **Key Point:** Node.js is not a programming language or a framework—it's a runtime environment for executing JavaScript on the server side.

### Why use Node.js?

- **Non-blocking I/O:** Handles many connections at once without waiting for operations like file or network access to finish.
- **Single Language Stack:** Use JavaScript for both frontend and backend, making full-stack development easier.
- **Fast and Efficient:** Powered by the V8 engine, Node.js is known for its speed.
- **Large Ecosystem:** npm (Node Package Manager) offers thousands of reusable packages.
- **Community Support:** Huge, active community and lots of learning resources.

**Comparison Example:**

- Traditional backend (e.g., PHP, Java): Each request may create a new thread, which is resource-intensive.
- Node.js: Uses a single-threaded event loop to handle many requests efficiently.

### Node.js in Modern Web Development

Node.js is used for:

- REST APIs
- Real-time chat apps (e.g., WhatsApp clones)
- Streaming services (e.g., Netflix)
- IoT applications
- Command-line tools

**Real-World Example:**
Netflix, PayPal, LinkedIn, and Uber use Node.js for parts of their backend systems.

**Sample Interview Q&A:**

- **Q:** What is Node.js and why is it popular?
- **A:** Node.js is a JavaScript runtime for server-side programming. It's popular due to its non-blocking I/O, speed, and use of JavaScript on both client and server.

**Summary:**
Node.js is a powerful tool for building scalable, high-performance backend applications using JavaScript.

---

## 2. Setup and Environment

### Installing Node.js

- **Windows/Mac/Linux:** Download from [nodejs.org](https://nodejs.org/). Installer includes npm.
- **Check installation:**

```bash
node -v
npm -v
```

### Using REPL (Read-Eval-Print Loop)

REPL lets you run JavaScript code interactively in the terminal:

```bash
node
> 2 + 2
4
> .exit
```

### Running Scripts

Save your code in a `.js` file and run:

```bash
node hello.js
```

### Using nodemon for Development

`nodemon` automatically restarts your app when files change.

```bash
npm install -g nodemon
nodemon app.js
```

**Practice Exercise:**

- Install Node.js and run a simple `console.log('Hello Node!')` script.

**Summary:**
Setting up Node.js is easy and cross-platform. REPL and nodemon speed up development.

---

## 3. Node.js Architecture

Node.js architecture is designed for high concurrency and scalability, leveraging an event-driven, non-blocking I/O model.

Operations can be synchronous (blocking) or asynchronous (non-blocking). The architecture is built around the event loop, which allows Node.js to handle multiple requests without creating new threads for each.

![Node.js Architecture](https://d2ms8rpfqc4h24.cloudfront.net/working_flow_of_node_7610f28abc.jpg)

### Event Loop, Timers, and Queues

Node.js uses an event-driven, non-blocking I/O model. The event loop is the heart of Node.js, allowing it to handle many connections efficiently.

- **Phases:** Timers, I/O callbacks, idle/prepare, poll, check, close callbacks.
- **Queue:** Events are queued and processed one at a time.

### Single-threaded Model and Worker Threads

- Node.js runs JavaScript in a single thread.
- For CPU-intensive tasks, use `worker_threads` to run code in parallel.

### libuv Overview

- `libuv` is a C library that powers Node.js's event loop and handles asynchronous I/O.

### Non-blocking I/O

- Node.js does not wait for file/network/database operations to finish. It uses callbacks/promises to handle results.

### Clustering

- Use the `cluster` module to run multiple Node.js processes and utilize multi-core CPUs.

**Sample Interview Q&A:**

- **Q:** How does Node.js handle many connections with a single thread?
- **A:** Through the event loop and non-blocking I/O, Node.js can process many requests without creating new threads for each.

**Summary:**
Node.js architecture is designed for scalability and efficiency using the event loop and non-blocking I/O.

---

## 4. Core Concepts

### CommonJS Modules

CommonJS is the default module system used in Node.js. It allows you to split your code into reusable modules.

- Use `require` and `module.exports` to import/export code.

```javascript
// math.js
function add(a, b) {
	return a + b;
}
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3));
```

### ES Modules

ES Modules (ECMAScript Modules) are the modern JavaScript module system, which can also be used in Node.js.

- Use `import` and `export` (add "type": "module" in package.json or use .mjs extension).

```javascript
// math.mjs (or math.js with "type": "module")
export function add(a, b) {
	return a + b;
}
// app.mjs (or app.js with "type": "module")
import { add } from './math.mjs';
console.log(add(2, 3));
```

### Global Objects

- `process`: Info about the current Node.js process.
- `__dirname`: Directory name of the current module.
- `__filename`: File name of the current module.

### Buffer and Stream Concepts

- **Buffer:** Raw binary data (useful for file/network operations).
- **Stream:** Handles data that is read/written in chunks (e.g., file streams, HTTP requests).

**Summary:**
Modules, global objects, buffers, and streams are foundational to Node.js development.

---

## 5. Core Modules

Node.js comes with a set of built-in modules that provide essential functionality for building applications. Here are some of the most commonly used core modules:

### http: Creating Servers

Server creation is a fundamental part of Node.js, allowing you to handle HTTP requests and responses.

```javascript
const http = require('http');
const server = http.createServer((req, res) => {
	// Handle incoming requests
	console.log(`Request received: ${req.method} ${req.url}`);
	// Send a response
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello from Server');
});
server.listen(3000, () => console.log('Server running on port 3000'));
```

### HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

HTTP methods define the type of action to be performed on a resource.

- **GET:** Retrieve data from the server (read-only).
- **POST:** Submit data to the server to create a resource.
- **PUT:** Update or replace existing data on the server completely.
- **PATCH:** Partially update existing data on the server.
- **DELETE:** Remove resource or data from the server.
- **HEAD:** Similar to GET, but only retrieves headers not the body.
- **OPTIONS:** Retrieve supported HTTP methods for a resource

### fs: File Operations

The `fs` module provides an API for interacting with the file system.

- **Sync:**
  Synchronous file operations block the event loop until completed.

```javascript
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');
```

- **Async:**
  Asynchronous file operations allow the event loop to continue running while waiting for the operation to complete.

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data);
});
```

- **Streams:**

```javascript
const readStream = fs.createReadStream('file.txt');
readStream.on('data', (chunk) => console.log(chunk.toString()));
```

### path: Working with File Paths

```javascript
const path = require('path');
console.log(path.join(__dirname, 'file.txt'));
```

### os: Accessing System Information

```javascript
const os = require('os');
console.log(os.platform(), os.cpus());
```

### events: Using EventEmitter

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
emitter.emit('greet', 'Node.js');
```

### child_process: Executing Shell Commands

```javascript
const { exec } = require('child_process');
exec('ls', (err, stdout, stderr) => {
	if (err) throw err;
	console.log(stdout);
});
```

### worker_threads: Basics

```javascript
const { Worker } = require('worker_threads');
new Worker('./worker.js');
```

**Summary:**
Node.js core modules provide essential building blocks for backend development.

---

## 6. npm and Package Management

### What is npm (Node Package Manager)?

npm (Node Package Manager) is the default package manager for Node.js, used to install, update, and manage third-party packages.

### Creating and Managing package.json

```bash
npm init -y
```

### Installing, Updating, and Removing Packages

```bash
npm install express
npm update express
npm uninstall express
```

### Installing specific package versions

```bash
npm install express@4.18.2
```

### Using npx (Node Package eXecute)

- Run packages without installing globally:

```bash
npx create-react-app my-app
```

### Semantic Versioning

- Format: MAJOR.MINOR.PATCH (e.g., 1.2.3)
- `^1.2.3`: Compatible with 1.x.x
- `~1.2.3`: Compatible with 1.2.x

| Part      | Meaning                                     | Example change  |
| --------- | ------------------------------------------- | --------------- |
| **MAJOR** | Breaking changes (incompatible API changes) | `1.0.0 → 2.0.0` |
| **MINOR** | New features, backward-compatible           | `1.2.0 → 1.3.0` |
| **PATCH** | Bug fixes, backward-compatible              | `1.2.3 → 1.2.4` |

**Summary:**
npm makes it easy to manage dependencies and scripts in Node.js projects.

---

## 7. Express.js Framework

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side applications with Node.js.

### Problem with Vanilla Node.js

Vanilla Node.js requires a lot of boilerplate code for routing, middleware, and handling requests/responses. Express.js abstracts these complexities, making it easier to build web applications. There is no need to create the server from scratch, handle routing manually, or manage middleware.

### Setting Up a Web Server in Express.js

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello Express!'));
app.listen(3000, () => console.log('Server running on port 3000'));
```

### Routing Basics

```javascript
app.get('/users', (req, res) => res.json([{ name: 'Alice' }]));
```

### Middleware Concepts

- Functions that run before route handlers.

```javascript
app.use(express.json());
```

### Serving Static Files

```javascript
app.use(express.static('public'));
```

### Building RESTful APIs

```javascript
app.post('/users', (req, res) => {
	// Add user logic
	res.status(201).send('User created');
});
```

### Error Handling Middleware

```javascript
app.use((err, req, res, next) => {
	res.status(500).send('Something broke!');
});
```

**Summary:**
Express.js simplifies web server and API development in Node.js.

---

## 8. REST API

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication model and uses standard HTTP methods to interact with resources.
RESTful APIs are widely used for building web services that can be consumed by various clients, including web browsers, mobile apps, and other servers. They are designed to be simple, scalable, and stateless.

### Key Principles of REST

- **Stateless:** Each request from the client to the server must contain all the information needed to understand and process the request.
- **Client-Server Architecture:** The client and server are separate entities that communicate over HTTP.
- **Uniform Interface:** Resources are identified by URIs, and standard HTTP methods (GET, POST, PUT, DELETE) are used to interact with them.
- **Cacheable:** Responses must define themselves as cacheable or not to improve performance.

### RESTful API Example with Express.js

```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/users', (req, res) => {
	res.json([{ id: 1, name: 'Alice' }]);
});
app.post('/api/users', (req, res) => {
	const newUser = req.body;
	// Logic to save newUser
	res.status(201).json(newUser);
});
app.put('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	const updatedUser = req.body;
	// Logic to update user with userId
	res.json(updatedUser);
});
app.delete('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	// Logic to delete user with userId
	res.status(204).send();
});
app.listen(3000, () => console.log('Server running on port 3000'));
```

### Running an Express Server

- Install Express using `npm install express`.
- Create a file named `index.js` and add the Express server code.
- Add `"start": "node index.js"` or `"dev": "nodemon index.js"` to your `package.json` scripts section to easily run your server.
- Run commands like `npm start` or `npm run dev` to start your Express server.
- Use `nodemon` for automatic server restarts during development by installing it globally with `npm install -g nodemon` or locally with `npm install --save-dev nodemon` as a dev dependency in your project.

### Tools for Testing REST APIs

- **Postman:** A popular tool for testing APIs with a user-friendly interface.
  - Download Desktop app: [Postman](https://www.postman.com/downloads/)
  - Install VS Code extension: [Postman for VS Code](https://marketplace.visualstudio.com/items?itemName=postman.postman-for-vscode)
- **cURL:** A command-line tool for making HTTP requests.
- **Insomnia:** Another user-friendly API testing tool.

### Best Practices for Designing REST APIs

- Use meaningful resource names (nouns) in URIs.
- Use appropriate HTTP methods for actions (GET for read, POST for create, PUT/PATCH for update, DELETE for delete).
- Use status codes to indicate success or failure (e.g., 200 OK, 201 Created, 404 Not Found).

## 9. Testing REST APIs with Postman

Postman is a popular API client that makes it easy to test your REST APIs without writing any frontend code.

### Setting Up Postman

1. Download Postman from [postman.com/downloads](https://www.postman.com/downloads/) or use the VS Code extension
2. Create a new workspace or collection for your project
3. Add requests for each endpoint you want to test

### Testing Different HTTP Methods

**1. GET Request (Retrieving Data)**

- Select `GET` method
- URL: `http://localhost:3000/api/users` or `http://localhost:3000/api/users/1`
- Click "Send" to view response

**2. POST Request (Creating Data)**

- Select `POST` method
- URL: `http://localhost:3000/api/users`
- Body tab → x-www-form-urlencoded
- Add key-value pairs:
  - `first_name`: `Deepak`
  - `last_name`: `Modi`
  - `email`: `deepakmodidev@gmail.com`
  - `gender`: `Male`
- Click "Send"

**3. PUT Request (Replacing Data)**

- Select `PUT` method
- URL: `http://localhost:3000/api/users/1`
- Body tab → x-www-form-urlencoded
- Add key-value pairs:
  - `first_name`: `Ranjit`
  - `last_name`: `Modi`
  - `email`: `ranjitmodi@gmail.com`
  - `gender`: `Male`
- Click "Send"

**4. PATCH Request (Partial Updates)**

- Select `PATCH` method
- URL: `http://localhost:3000/api/users/1`
- Body tab → x-www-form-urlencoded
- Add key-value pair:
  - `last_name`: `Barnwal`
- Click "Send"

**5. DELETE Request (Removing Data)**

- Select `DELETE` method
- URL: `http://localhost:3000/api/users/1`
- Click "Send" (returns 204 No Content or confirmation)

## 10. Complete Express REST API Example

Here's a complete example of a REST API built using Express.js that implements all the HTTP methods (GET, POST, PUT, PATCH, DELETE):

```javascript
// Building REST API's using Node and Express.js

/*
GET /users - fetch all users and render HTML page
GET /api/users → fetch all users (return as JSON)
GET /api/users/1 → fetch user with ID 1  
POST /api/users → create a new user  
PUT /api/users/1 → update user with ID 1  
PATCH /api/users/1 → partially update user with ID 1
DELETE /api/users/1 → delete user with ID 1  
*/

const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json'); // Mockaroo.com generated data
const { log } = require('node:console');

const app = express();
const PORT = 3000;

// Middleware - Like a plug-in that adds functionality to the app
app.use(express.urlencoded({ extended: false }));

// Routes...

app.get('/users', (req, res) => {
	res.send(`
        <html>
            <head>
                <title>Users</title>
            </head>
            <body>
                <h1>Users List</h1>
                <ul>
                    ${users
						.map(
							(user) =>
								`<li>${user.first_name} ${user.last_name}</li>`
						)
						.join('')}
                </ul>
            </body>
        </html>
    `);
});

app.get('/api/users', (req, res) => {
	res.json(users);
});

app.get('/api/users/:id', (req, res) => {
	const userId = Number(req.params.id);
	const user = users.find((u) => u.id === userId);
	res.json(user);
});

app.post('/api/users', (req, res) => {
	const body = req.body;
	users.push({ ...body, id: users.length + 1 });
	fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
		res.json({
			message: 'User created successfully',
			id: users.length,
			user: body,
		});
	});
});

app
	.route('/api/users/:id')
	.put((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);
		if (userIndex !== -1) {
			const updatedUser = { ...users[userIndex], ...req.body };
			users[userIndex] = updatedUser;
			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User updated successfully', user: updatedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
	.patch((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex !== -1) {
			const updatedUser = { ...users[userIndex] };

			for (const key in req.body) {
				updatedUser[key] = req.body[key];
			}

			users[userIndex] = updatedUser;

			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User patched successfully', user: updatedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
	.delete((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex !== -1) {
			const deletedUser = users[userIndex];
			users.splice(userIndex, 1);

			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User deleted successfully', user: deletedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	});

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
);
```

### Key Features Implemented

1. **Serving HTML content** - The `/users` endpoint renders an HTML page
2. **REST API endpoints** - CRUD operations using all standard HTTP methods
3. **Dynamic route parameters** - Using `:id` to handle different user IDs
4. **Middleware** - Using `express.urlencoded()` to parse form data
5. **Route chaining** - Using `app.route()` to group related endpoints
6. **File operations** - Reading from and writing to JSON file for persistence
7. **Error handling** - Checking if user exists and returning appropriate status codes

### Important Concepts

- **Route parameters** - `:id` creates a variable in `req.params.id`
- **Request body** - Accessible via `req.body` when using appropriate middleware
- **Sending responses** - Using `res.json()`, `res.send()`, and status codes
- **Status codes** - 200 OK (default), 404 Not Found for missing resources
