// const jwt = require('jsonwebtoken');
const base64url = require('base64url');
const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "NCParksToken";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever
const API_SECRET = "60d0954e20eaa0c02b382171c33c53bc18522cc6d4805eaa02e182b0";

// Create an HMAC instance with the specified algorithm (e.g., 'sha256')
// const algorithm = 'sha256';
// const hmac = crypto.createHmac(algorithm, API_SECRET);

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  console.log("Cookies: ", req.cookies[TOKEN_COOKIE_NAME]);
  console.log("Auth: ", req.get('Authorization'));
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1];
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { // If we don't have a token
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {
    // const decoded = jwt.verify(token, API_SECRET);

    // parse provided JWT token into its three parts: header, payload, and signature
    let [header, data, hmacSignature] = token.split('.');

    header = JSON.parse(base64url.decode(header));
    data = JSON.parse(base64url.decode(data));

    // Verify the HMAC signature
    const base64header = base64url.encode(JSON.stringify(header));
    const base64payload = base64url.encode(JSON.stringify(data));
    // const combinedPayload = base64url.encode(JSON.stringify(header)) + "." + base64url.encode(JSON.stringify(data));
    const calculatedSignature = crypto.createHmac('sha256', API_SECRET).update(base64header + "." + base64payload).digest('hex');
    if (hmacSignature !== calculatedSignature) {
      throw new Error('Invalid token signature');
    }

    req.user = data.user;
    console.log("User: ", req.user);
    // req.user = decoded.user;
    next(); //Make sure we call the next middleware
  }
  catch(err) { //Token is invalid
    console.log(":(((((((((((((((((((", err)
    res.status(401).json({error: 'Not authenticated'});
    return;
  }


}


exports.generateToken = (req, res, user) => {
  let header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  let data = {
    user: user,
    // Use the exp registered claim to expire token in 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  // const token = jwt.sign(data, API_SECRET);
  const base64header = base64url.encode(JSON.stringify(header));
  const base64payload = base64url.encode(JSON.stringify(data));
  const hmacSignature = crypto.createHmac('sha256', API_SECRET).update(base64header + "." + base64payload).digest('hex');
  const token = base64header + "." + base64payload + "." + hmacSignature;

  console.log("Token: ", token);
  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 //This session expires in 2 minutes.. but token expires in 1 hour!
  });
};


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}

