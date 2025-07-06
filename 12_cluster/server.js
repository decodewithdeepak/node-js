const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;
// console.log(`Number of CPUs: ${numCPUs}`); // Mine - 12

if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}
else {
    const app = express();
    app.get('/', (req, res) => {
        res.json({ message: 'Hello from Express Server!' + ` Process ID: ${process.pid}` });
    });
    app.listen(8000, () => console.log(`Server is running on http://localhost:8000`));
}