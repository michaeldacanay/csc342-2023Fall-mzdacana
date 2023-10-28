const express = require('express');
const frontendRouter = express.Router();

// Designate the static folder as serving static resources
frontendRouter.use(express.static('static'));

const path = require('path');
const html_dir = path.join(__dirname, '../../templates/');

frontendRouter.get('/', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

frontendRouter.get('/park', (req,  res) => {
  if(req.query.id && req.session.visitedParks && !req.session.visitedParks.includes(req.query.id)) {
    req.session.visitedParks.push(req.query.id);
  }
  
  res.sendFile(`${html_dir}park.html`);
});


frontendRouter.get('/error', (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});

frontendRouter.get('/login', (req,  res) => {
  console.log(req.session);
  req.session.user = "student";
  res.redirect(302, `/`);
});

frontendRouter.get('/logout', (req,  res) => {
  req.session.user = null;
  res.redirect(302, `/`);
});



module.exports = frontendRouter;