const express = require('express');
const hbs = require('hbs');
const db = require('./src/db_mock');

const app = express();
const PORT = 3000;

//Configure handlebars tempalte engine
app.set('view engine', 'hbs')
app.set('views', 'templates')

// Designate the public folder as serving static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  let data = {
    currentCounty: req.query.county
  }
  db.getCounties().then(counties => {
    data.counties = counties;
    return db.getParksByCounty(req.query.county);
  }).then(parks => {
    data.parks = parks;
    res.render('index', data);
  })
});

app.get('/park', (req, res) => {
  db.getParkById(req.query.id).then(park => {
    res.render('park', {park: park});
  }).catch(() => {
    res.status(404).render('error', {id: req.query.id});
  })
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));