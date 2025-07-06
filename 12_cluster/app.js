const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express Server!' + ` Process ID: ${process.pid}` });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
