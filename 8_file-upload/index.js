const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// const upload = multer({ dest: 'uploads/' }); // not useful

// Using diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // unique filename
    }
})
const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Show uploaded files as static content
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.render('homepage');
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log('File uploaded:', req.file);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});