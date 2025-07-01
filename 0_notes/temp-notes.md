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

Here's the complete example of a REST API that you've built using Express.js, implementing all the HTTP methods (GET, POST, PUT, PATCH, DELETE):

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

// API endpoint to render HTML page fetching all users
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

// API endpoint to fetch all users as JSON
app.get('/api/users', (req, res) => {
	res.json(users);
});

// API endpoint to fetch user by ID
app.get('/api/users/:id', (req, res) => {
	// Dynamic path parameter (:id - variable)
	// req.params.id will contain the value of the ID from the URL
	const userId = Number(req.params.id);
	const user = users.find((u) => u.id === userId);
	res.json(user);
});

// API endpoint to create a new user
app.post('/api/users', (req, res) => {
	const body = req.body;
	// console.log('Request Body:', body);
	users.push({ ...body, id: users.length + 1 }); // Add new user with an incremented ID
	// Save updated users to MOCK_DATA.json
	fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
		res.json({
			message: 'User created successfully',
			id: users.length,
			user: body,
		});
	});
});

// Chaining route handlers for user operations
app
	.route('/api/users/:id')
	// API endpoint to update user by ID
	.put((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);
		if (userIndex !== -1) {
			const updatedUser = { ...users[userIndex], ...req.body };
			users[userIndex] = updatedUser; // Update the user in the array
			// Save updated users to MOCK_DATA.json
			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User updated successfully', user: updatedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
	// API endpoint for partial updates to user by ID
	.patch((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex !== -1) {
			// Only update the fields provided in the request body
			const updatedUser = { ...users[userIndex] };

			// Apply only the fields that were provided
			for (const key in req.body) {
				updatedUser[key] = req.body[key];
			}

			users[userIndex] = updatedUser;

			// Save updated users to MOCK_DATA.json
			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User patched successfully', user: updatedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
	// API endpoint to delete user by ID
	.delete((req, res) => {
		const userId = Number(req.params.id);
		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex !== -1) {
			const deletedUser = users[userIndex];
			users.splice(userIndex, 1); // Remove user from array

			// Save updated users to MOCK_DATA.json
			fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
				res.json({ message: 'User deleted successfully', user: deletedUser });
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	});

// Start the server
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

