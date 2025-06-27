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
const users = require('./MOCK_DATA.json'); // Mockaroo.com generated data

const app = express();
const PORT = 3000;

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

// // API endpoint to fetch user by ID
// app.get('/api/users/:id', (req, res) => {
//     // Dynamic path parameter (:id - variable)
//     // req.params.id will contain the value of the ID from the URL
//     const userId = Number(req.params.id);
//     const user = users.find(u => u.id === userId);
//     res.json(user);
// });

// API endpoint to handle user operations by ID
// This endpoint will handle GET, POST, PUT, DELETE methods for user operations
app
.route('/api/users/:id')
// API endpoint to fetch user by ID
.get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);
    res.json(user);
})
// API endpoint to create a new user
.post((req, res) => {
    
})
// API endpoint to update user by ID
.put((req, res) => {
})
// API endpoint to delete user by ID
.delete((req, res) => {
});


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));