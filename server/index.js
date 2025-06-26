// Express.js Framework
// Express.js is a minimal Node.js web framework that simplifies the process of creating servers and handling routes.
// It provides a more structured way to handle requests and responses, making it easier to build web applications.

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
    res.send(`About Us Page - Hello ${req.query.username} , You are ${req.query.age}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
// No need to create the HTTP server manually
// Express handles server creation internally by calling `app.listen()`
// Express is just a framework, internally it uses Node.js HTTP module to create the server