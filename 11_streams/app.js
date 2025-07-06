const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const readStream = fs.createReadStream('sample.txt', 'utf8');
    // readStream.on('data', (chunk) => res.write(chunk));
    // readStream.on('end', () => res.end());
    readStream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});