// File Handling in NodeJS
// Node.js provides a built-in 'fs' module for file system operations
// It allows to read, write, and manipulate files and directories

// SYNCHRONOUS OPERATIONS (Blocking) - block the event loop until the operation completes
// ASYNCHRONOUS OPERATIONS (Non-blocking) - allow the event loop to continue running while the operation is in progress
// Note: Async operations are preferred in Node.js for better performance

const fs = require('fs');

// READ OPERATIONS

// // Synchronous read
// const data = fs.readFileSync('./contacts.txt', 'utf8');
// console.log(data);

// // Asynchronous read
// fs.readFile('./contacts.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log(data);
// });


// WRITE OPERATIONS

// // Synchronous write
// fs.writeFileSync('./file.txt', 'Hello Write Sync');

// // Asynchronous write
// fs.writeFile('./file.txt', 'Hello Write Async', (err) => {
//   if (err) {
//     console.error('Error writing file:', err);
//     return;
//   }
//   console.log('File written successfully');
// });


// APPEND OPERATIONS

// // Synchronous append
// fs.appendFileSync('./file.txt', '\nHello Append Sync');

// // Asynchronous append
// fs.appendFile('./file.txt', '\nHello Append Async', (err) => {
//   if (err) {
//     console.error('Error appending to file:', err);
//     return;
//   }
//   console.log('File appended successfully');
// });


// COPY OPERATIONS

// // Synchronous copy
// fs.copyFileSync('./file.txt', './file_copy.txt');

// // Asynchronous copy
// fs.copyFile('./file.txt', './file_copy_async.txt', (err) => {
//   if (err) {
//     console.error('Error copying file:', err);
//     return;
//   }
//   console.log('File copied successfully');
// });


// DELETE OPERATIONS

// // Synchronous delete
// fs.unlinkSync('./file_copy.txt');

// // Asynchronous delete
// fs.unlink('./file_copy_async.txt', (err) => {
//   if (err) {
//     console.error('Error deleting file:', err);
//     return;
//   }
//   console.log('File deleted successfully');
// });

// STATISTICS OPERATIONS
// // Synchronous stats
// const stats = fs.statSync('./file.txt');
// console.log(stats);

// // Asynchronous stats
// fs.stat('./file.txt', (err, stats) => {
//   if (err) {
//     console.error('Error getting file stats:', err);
//     return;
//   }
//   console.log(stats);
// });

// DIRECTORY OPERATIONS
// Create a directory
// fs.mkdirSync('./new_directory');
// fs.mkdirSync('./new_directory/sub_directory');

fs.mkdirSync('./new_directory1/sub_directory1', { recursive: true });