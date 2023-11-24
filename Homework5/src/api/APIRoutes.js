const express = require('express');
// const cookieParser = require('cookie-parser');

const apiRouter = express.Router();

// apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {TokenMiddleware, generateToken, removeToken} = require('../middleware/TokenMiddleware');



/************\
* API ROUTES *
\************/
const FollowDAO = require('./db/FollowDAO');
const HowlDAO = require('./db/HowlDAO');
const UserDAO = require('./db/UserDAO');


//Get current authenticated user
apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
  if(req.session.user) {
    res.json(req.session.user);
  }
  else {
    res.status(401).json({error: 'Not authenticated'});
  }
});

//Login a user
apiRouter.post('/login', (req, res) => {
  console.log("req.body: ", req.body)
  const username = req.body.username;
  const password = req.body.password;
  if(username && password) {
    console.log("in here")
    UserDAO.getUserByCredentials(username, password).then(user => {
      let result = {
        user: user
      }

      console.log("APIRoutes - User: ", user);
      generateToken(req, res, user);

      if(user) {
        req.session.user = user;
        res.json(result);
      }
      else {
        res.status(404).json({error: 'User not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: 'Internal server error'});
    });
  } else {
    res.status(400).json({error: 'Missing username or password'});
  }
});

//Login a user
// apiRouter.get('/login/:username', TokenMiddleware, (req, res) => {
//   const username = req.params.username;
//   UserDAO.getUser(username).then(user => {
//     if(user) {
//       req.session.user = user;
//       res.json(user);
//     }
//     else {
//       res.status(404).json({error: 'User not found'});
//     }
//   })
//   .catch(err => {
//     res.status(500).json({error: 'Internal server error'});
//   });
// });



//Logout current user
apiRouter.post('/logout', (req, res) => {
  // const userId = req.body.userId;
  // console.log('logout userId: ', userId);
  // UserDAO.getUserById(userId).then(user => {
  //   if(user) {
  //     req.session.user = null;
  //     res.json(user);
  //   }
  //   else {
  //     res.status(404).json({error: 'User not found'});
  //   }
  // })
  // .catch(err => {
  //   res.status(500).json({error: 'Internal server error'});
  // });
  removeToken(req, res);
  req.session.user = null;

  res.json({success: true});
});

//Get all follows
apiRouter.get('/follows', TokenMiddleware, (req, res) => {
  FollowDAO.getFollows().then(follows => {
    res.json(follows);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all howls
apiRouter.get('/howls', TokenMiddleware, (req, res) => {
  HowlDAO.getHowls().then(howls => {
    res.json(howls);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all users
apiRouter.get('/users', TokenMiddleware, (req, res) => {
  UserDAO.getUsers().then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Get specific user
apiRouter.get('/users/:userId', TokenMiddleware, (req, res) => {
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


//Get specific howl
apiRouter.get('/howls/:howlId', TokenMiddleware, (req, res) => {
  const howlId = req.params.howlId;
  HowlDAO.getHowlById(howlId).then(howl => {
    if(howl) {
      res.json(howl);
    }
    else {
      res.status(404).json({error: 'Howl not found'});
    }
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get all howls posted by specific user
apiRouter.get('/users/:userId/howls', TokenMiddleware, (req, res) => {
  const userId = req.params.userId;
  console.log('userId: ', userId)
  HowlDAO.getHowlsByUserId(userId).then(howls => {
    res.json(howls);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Get howls posted by all users followed by "current" user
apiRouter.get('/users/:userId/following/howls', TokenMiddleware, (req, res) => {
  const userId = req.params.userId;
  console.log('/users/:userId/following/howls userId: ', userId);

  FollowDAO.getFollowingByUserId(userId)
    .then(follows => {
      console.log('follows: ', follows);
      
      // Map follows to an array of promises
      const howlPromises = follows.map(follow => {
        return HowlDAO.getHowlsByUserId(follow);
      });
      
      // Wait for all promises to resolve
      return Promise.all(howlPromises);
    })
    .then(results => {
      // Flatten the array of arrays into a single array
      const howls = [].concat(...results);
      console.log('howls: ', howls);
      
      res.json(howls);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// apiRouter.get('/users/:userId/following/howls', (req, res) => {
//   const userId = req.params.userId;
//   console.log('/users/:userId/following/howls userId: ', userId);
//   FollowDAO.getFollowingByUserId(userId).then(follows => {
//     console.log('follows: ', follows);
//     let howls = [];
//     follows.forEach(follow => {
//       HowlDAO.getHowlsByUserId(follow).then(userHowls => {
//         console.log('userHowls: ', userHowls);
//         console.log('howls: ', howls);
//         howls = howls.concat(userHowls);
        
//       })
//       .catch(err => {
//         res.status(500).json({error: 'Internal server error'});
//       });
//     });

//     // after forEach is done
//     res.json(howls);
//   });
// });

//Get all users followed by specific user
apiRouter.get('/users/:userId/following', TokenMiddleware, (req, res) => {
  const userId = req.params.userId;
  FollowDAO.getFollowingByUserId(userId).then(follows => {
    res.json(follows);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});


//Create a howl
apiRouter.post('/howls', TokenMiddleware, (req, res) => {
  const currentDate = new Date();
  const datetimeString = currentDate.toISOString();
  console.log(datetimeString);

  const formattedDate = datetimeString.slice(0, -5) + 'Z';
  console.log(formattedDate);

  const newHowl = {
    userId: req.body.userId,
    datetime: formattedDate,
    text: req.body.text,
  };

  HowlDAO.createHowl(newHowl).then(howl => {
    res.json(howl);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});

//Following a user
apiRouter.post('/following', TokenMiddleware, (req, res) => {
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
apiRouter.post('/unfollowing', TokenMiddleware, (req, res) => {
  let userId = req.body.userId;
  let followingId = req.body.followingId;
  FollowDAO.deleteFollow(userId, followingId).then(follow => {
    res.json(follow);
  })
  .catch(err => {
    res.status(500).json({error: 'Internal server error'});
  });
});



apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
  console.log("/users/current APIRoutes.js", req.user);
  res.json(req.user);
  // if(req.session.user) {
  //   res.json(req.session.user);
  // }
  // else {
  //   res.status(401).json({error: 'Not authenticated'});
  // }
});

module.exports = apiRouter;
