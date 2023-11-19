const sessions = {};

module.exports = (req, res, next) => {
  if (!req.cookies['howler-sessionID']) { // No cookie, new user session
    const sessionID = Math.floor(Math.random() * 1000000000);
    sessions[sessionID] = generateEmptySession();
    req.session = sessions[sessionID];
    res.cookie('howler-sessionID', sessionID);
    console.log('Created new session', req.session);
  }
  else {  // Cookie, returning user
    const sessionID = req.cookies['howler-sessionID'];
    const session = sessions[sessionID];
    if (session) {
      req.session = session;
      console.log('Found existing session', req.session);
    }
    else {
      sessions[sessionID] = generateEmptySession();
      req.session = sessions[sessionID];
      // Client has cookie from before server restarted, create new session entry for this user
      console.log('Created new session entry; server restarted', req.session);
    }
  }
  next(); // Call the next middleware
}


function generateEmptySession() {
  return {
    user: null
  };
}