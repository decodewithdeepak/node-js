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

## 8. File Handling and Streams

### Reading and Writing Files

```javascript
fs.writeFile('output.txt', 'Hello, file!', (err) => {
	if (err) throw err;
});
```

### Working with Directories

```javascript
fs.mkdir('new-folder', (err) => {
	if (err) throw err;
});
```

### Streams: Readable, Writable, Duplex, Transform

- **Readable:** `fs.createReadStream()`
- **Writable:** `fs.createWriteStream()`
- **Duplex:** Both readable and writable (e.g., TCP sockets)
- **Transform:** Modify data as it passes through (e.g., zlib compression)

### Piping Data

```javascript
const read = fs.createReadStream('input.txt');
const write = fs.createWriteStream('output.txt');
read.pipe(write);
```

**Summary:**
Streams efficiently handle large files and data flows in Node.js.

---

## 9. Event-Driven Programming

### Using Event Loop in Practice

- Most Node.js APIs are event-driven (e.g., HTTP server, file system).

### Writing Custom Event Emitters

```javascript
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => console.log('Event fired!'));
myEmitter.emit('event');
```

### Example Use Cases

- Real-time chat apps
- Notification systems

**Summary:**
Event-driven programming is central to Node.js's scalability and responsiveness.

---

## 10. Asynchronous Programming

### Callbacks

```javascript
fs.readFile('file.txt', (err, data) => {
	if (err) return console.error(err);
	console.log(data.toString());
});
```

### Promises

```javascript
const readFile = require('fs').promises.readFile;
readFile('file.txt', 'utf8')
	.then((data) => console.log(data))
	.catch((err) => console.error(err));
```

### async/await

```javascript
async function read() {
	try {
		const data = await readFile('file.txt', 'utf8');
		console.log(data);
	} catch (err) {
		console.error(err);
	}
}
read();
```

### Error Handling in Async Code

- Always handle errors in callbacks, promises, and async functions.

**Sample Interview Q&A:**

- **Q:** What is the difference between callbacks and promises?
- **A:** Callbacks pass functions as arguments, while promises provide a cleaner, chainable way to handle async results and errors.

**Summary:**
Mastering async patterns is crucial for Node.js development.

---

## 11. Database Connectivity

### Connecting Node.js to MongoDB (Mongoose Basics)

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');
```

### Connecting Node.js to MySQL

```javascript
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
});
conn.connect();
```

### Connecting Node.js to PostgreSQL

```javascript
const { Client } = require('pg');
const client = new Client();
client.connect();
```

**Summary:**
Node.js supports many databases via npm packages.

---

## 12. Tooling and Debugging

### Debugging with node inspect

```bash
node inspect app.js
```

### Debugging with VSCode

- Set breakpoints and debug directly in the editor.

### Using pm2 for Process Management

```bash
npm install -g pm2
pm2 start app.js
```

**Summary:**
Node.js offers powerful tools for debugging and process management.

---

## 13. Deployment

### Deploying to Heroku

- Install Heroku CLI, run `heroku create`, `git push heroku main`.

### Deploying to Vercel

- Install Vercel CLI, run `vercel`.

### Deploying to AWS

- Use AWS Elastic Beanstalk or EC2.

### Managing Environment Variables with dotenv

```javascript
require('dotenv').config();
console.log(process.env.MY_SECRET);
```

**Summary:**
Deployment is streamlined with cloud platforms and environment variable management.

---

## 14. Security Basics

### Handling Input Securely

- Always validate and sanitize user input.

### Preventing Injection Attacks

- Use parameterized queries for databases.

### Securing API Endpoints

- Use authentication (JWT, OAuth).

**Summary:**
Security is critical—never trust user input and always secure your APIs.

---

## 15. Testing Node.js Apps

### Introduction to Testing with Jest

```javascript
// sum.js
function sum(a, b) {
	return a + b;
}
module.exports = sum;
// sum.test.js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});
```

### Writing Unit Tests for API Routes

- Use `supertest` with Jest or Mocha.

**Summary:**
Testing ensures your code works and prevents future bugs.

---

## 16. Real-World Mini Projects

### Real-time Chat App with socket.io

- Use `socket.io` for real-time messaging between clients and server.

### REST API for Managing Users or Products

- Build CRUD endpoints using Express and MongoDB.

### File Uploader

- Use `multer` middleware to handle file uploads in Express.

### CLI Tool (e.g., Todo App)

- Use `process.argv` to build command-line tools.

**Starter Code Example:**

```javascript
// Simple CLI tool
const args = process.argv.slice(2);
console.log('Arguments:', args);
```

---

## 17. Practice Exercises

- Build a note-taking REST API
- Create a static file server
- Write a simple command-line calculator

---

## 18. Best Practices

### Organizing Project Folders

- Use `routes/`, `controllers/`, `models/`, `middlewares/`, `utils/` folders.

### Error Handling Strategies

- Centralize error handling with middleware.

### Code Readability, Linting (ESLint)

- Use ESLint to enforce code style.

### Using Environment Variables

- Store secrets in `.env` files, not in code.

**Summary:**
Following best practices leads to maintainable, secure, and scalable Node.js applications.

---

# End of Node.js Notes
