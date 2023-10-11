const express = require('express'); // Import our Express dependency
const multer = require('multer');
const upload = multer({dest: 'file_uploads/'});

const app = express(); // Create a new server instance
const PORT = 3000; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(html_path + 'index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(html_path + 'login.html');
});

app.post('/login', (req, res) => {
  console.log("Query", req.query);
  console.log("Body", req.body);
  res.sendFile(html_path + 'login.html');
});


app.get('/formdata', (req, res) => {
  console.log("Query", req.query);
  console.log("Body", req.body);
  res.sendFile(html_path + 'received.html');
});

app.post('/formdata', upload.single('myfile'), (req, res) => {
  console.log("Query", req.query);
  console.log("Body", req.body);
  console.log("File", req.file);
  res.sendFile(html_path + 'received.html');
});



// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));