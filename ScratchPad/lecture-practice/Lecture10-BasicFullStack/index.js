// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();
// Port number we want to use of this server
const PORT = 3001;

// Designate the public folder as the location to look for static resources
app.use(express.static('public'));

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// app.get("/test", (req, res, next) => {
//     console.log("We're in the middleware")
//     // res.send("not allowed");    // ex; checking if authenticated
//     next()
// }, (req, res) => {
//     res.send("hello world");
// });

app.get("/some/other/path", (req, res) => {
    res.send("hello class");
});

// app.post