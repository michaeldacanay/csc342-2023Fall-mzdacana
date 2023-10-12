// Import our Express dependency
const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'static/uploads/'});

const app = express();  // Create a new server instance
const PORT = 3000;  // Port number we want to use of this server

const html_dir = __dirname + '/templates/';

// Set up Middleware

// Designate the public folder as the location to look for static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/",(req, res) => {
    res.sendFile(html_dir + "form.html");
});

app.post("/send", upload.single('myfile'), (req, res) => {
    console.log("Query", req.query);
    console.log("Body", req.body);
    console.log("File", req.file);
    res.send("form submitted");
    // res.sendFile(html_dir + "form.html");
});

// Ask our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));