const express = require('express');

const app = express();
const PORT = 80;

// Designate the public folder as serving static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// const session = require('express-session');
const sessionCookieMiddleware = require('./src/middleware/sessionCookieMiddleware');
app.use(sessionCookieMiddleware);


const routes = require('./src/routes');
app.use(routes)

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
