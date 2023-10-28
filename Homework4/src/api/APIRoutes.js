const express = require('express');
const apiRouter = express.Router();


/************\
* API ROUTES *
\************/
const FollowDAO = require('./db/FollowDAO');
const HowlDAO = require('./db/HowlDAO');
const UserDAO = require('./db/UserDAO');

apiRouter.use(express.json());

//Get all counties
apiRouter.get('/follows', (req,  res) => {
  FollowDAO.getFollows().then(follows => {
    res.json(follows);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all parks
apiRouter.get('/howls', (req,  res) => {
  HowlDAO.getHowls().then(howls => {
    res.json(howls);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get specific park
apiRouter.get('/parks/:parkId', (req,  res) => {
  const parkId = req.params.parkId;
  ParkDAO.getParkById(parkId).then(park => {
    if(park) {
      res.json(park);
    }
    else {
      res.status(404).json({error: 'Park not found'});
    }
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all parks in specific county
apiRouter.get('/counties/:county/parks', (req,  res) => {
  const county = req.params.county;
  ParkDAO.getParksByCounty(county).then(parks => {
    res.json(parks);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get specific county
apiRouter.get('/counties/:county', (req,  res) => {
  const countyParam = req.params.county;
  CountyDAO.getCounty(countyParam).then(county => {
    if(county) {
      res.json(county);
    }
    else {
      res.status(404).json({error: 'County not found'});
    }
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Create a park
apiRouter.post('/parks', (req,  res) => {
  let newPark = req.body;
  ParkDAO.createPark(newPark).then(park => {
    res.json(park);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Create a county
apiRouter.post('/counties', (req,  res) => {
  let newCounty = req.body;
  CountyDAO.createCounty(newCounty).then(county => {
    res.json(county);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Update a county
apiRouter.put('/counties/:county', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});
//Update a park
apiRouter.put('/parks/:parkId', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});

//Delete a county
apiRouter.delete('/counties/:county', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});
//Delete a park
apiRouter.delete('/parks/:parkId', (req,  res) => {
  res.status(501).json({error: 'Not implemented'});
});





apiRouter.get('/users/current', (req,  res) => {
  if(req.session.user) {
    res.json(req.session.user);
  }
  else {
    res.status(401).json({error: 'Not authenticated'});
  }
});

apiRouter.get('/users/current/parks', (req,  res) => {
  if(req.session.user) {
    res.json(req.session.visitedParks);
  }
  else {
    res.status(401).json({error: 'Not authenticated'});
  }
});





module.exports = apiRouter;
