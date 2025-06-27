// Building REST API's using Node and Express.js

/*

GET /users - fetch all users and render HTML page

GET /api/users → fetch all users (return as JSON)
GET /api/users/1 → fetch user with ID 1  
POST /api/users → create a new user  
PUT /api/users/1 → update user with ID 1  
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
                    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
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
    const user = users.find(u => u.id === userId);
    res.json(user);
});

// API endpoint to create a new user
app.post('/api/users', (req, res) => {
    const body = req.body;
    // console.log('Request Body:', body);
    users.push({ ...body, id: users.length + 1 }); // Add new user with an incremented ID
    // Save updated users to MOCK_DATA.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        res.json({ message: 'User created successfully', id: users.length, user: body });
    });
});

// Chaining route handlers for user operations
app.route('/api/users/:id')
// API endpoint to update user by ID
.put((req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
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
    const userIndex = users.findIndex(u => u.id === userId);

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
    const userIndex = users.findIndex(u => u.id === userId);

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
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));