const express = require('express');
const apiRouter = express.Router();


/************\
* API ROUTES *
\************/
const FollowDAO = require('./db/FollowDAO');
const HowlDAO = require('./db/HowlDAO');
const UserDAO = require('./db/UserDAO');

apiRouter.use(express.json());

//Login a user
apiRouter.get('/login/:username', (req, res) => {
  const username = req.params.username;
  UserDAO.getUser(username).then(user => {
    if(user) {
      // req.session.user = user;
      res.json(user);
    }
    else {
      res.status(404).json({error: 'User not found'});
    }
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all follows
apiRouter.get('/follows', (req, res) => {
  FollowDAO.getFollows().then(follows => {
    res.json(follows);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all howls
apiRouter.get('/howls', (req, res) => {
  HowlDAO.getHowls().then(howls => {
    res.json(howls);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all users
apiRouter.get('/users', (req, res) => {
  UserDAO.getUsers().then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Get specific user
apiRouter.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  UserDAO.getUserById(userId).then(user => {
    if(user) {
      res.json(user);
    }
    else {
      res.status(404).json({error: 'User not found'});
    }
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all howls posted by specific user
apiRouter.get('/users/:userId/howls', (req, res) => {
  const userId = req.params.userId;
  HowlDAO.getHowlsByUserId(userId).then(howls => {
    res.json(howls);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get howls posted by all users followed by "current" user
apiRouter.get('/users/:userId/following/howls', (req, res) => {
  const userId = req.params.userId;
  FollowDAO.getFollowingByUserId(userId).then(follows => {
    let howls = [];
    follows.forEach(follow => {
      HowlDAO.getHowlsByUserId(follow).then(userHowls => {
        howls = howls.concat(userHowls);
      })
      .catch(err => {
        res.status(500).json({error: 'Internal server error'});
      });
    });
    res.json(howls);
  });
});

//Get all users followed by specific user
apiRouter.get('/users/:userId/following', (req, res) => {
  const userId = req.params.userId;
  FollowDAO.getFollowingByUserId(userId).then(follows => {
    res.json(follows);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Create a howl
apiRouter.post('/howls', (req, res) => {
  let newHowl = req.body;
  HowlDAO.createHowl(newHowl).then(howl => {
    res.json(howl);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Following a user
apiRouter.post('/following', (req, res) => {
  let userId = req.body.userId;
  let followingId = req.body.followingId;
  FollowDAO.createFollow(userId, followingId).then(follow => {
    res.json(follow);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Unfollowing a user
apiRouter.put('/unfollowing', (req, res) => {
  let userId = req.body.userId;
  let followingId = req.body.followingId;
  FollowDAO.deleteFollow(userId, followingId).then(follow => {
    res.json(follow);
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
