# Homework 5: Authentication With JWT

1. An interesting challenge you encountered when implementing JWT algorithms. What was the issue and how did you solve it?  
I faced an interesting challenge when attempting to decode the JWT token. It was a challenge because I was not familiar with the JWT format. I had to do some research to understand the format and do the initial parsing. A debugging problem I faced was for some reason, I was only able to log in once and subsequent logins would fail and automatically logout. It turns out that the mistake is I was reusing the HMAC object. Instead, I had to create a new HMAC object every time I decode the token.

```
const algorithm = 'sha256';
const hmac = crypto.createHmac(algorithm, API_SECRET);

const hmacSignature = hmac.update(token).update(base64header + "." + base64payload).digest('hex');;

-->

const hmacSignature = crypto.createHmac('sha256', API_SECRET).update(token).update(base64header + "." + base64payload).digest('hex');

```

2. What security risks/vulnerabilities/weaknesses, if any, are present in your implementation? How can they be exploited and what are some ways to fix them? Are there any tradeoffs if you implement any of the fixes?  
One security risk is in my implementation, I hardcode the API_SECRET for the HMAC computation. In a production environment, this should be stored in an environment variable. However, the hashing algorithms for salting the passwords and using JWTs to encrypt the data are quite secure.



## Changelog

Fri. 11/24 resubmission

- build on Howler implementation from HW4
- add password and salt to schema for student and graduate users
- add TokenMiddleware.js and protecting the API endpoints if unauthenticated

Feedback:  

#3
```
I have gone through your request for additional feedback for your 5th Homework and can see that you've made the necessary changes. Good work !
```

#2
```
I have tested your app and can login and logout successfully ! However, the reused pages have not been replaced with pages you have created on your own, and this is something you can work on.
```

- revision to hmac computation, fixing issue where logins would fail after the first login

#1
```
You have reused all of the code from the lecture assignment which is not what you're supposed to do. You should create your own webpages and make sure you mostly write your own javascript,html and css. A few part such as the token middleware can be used as reference and you can reuse code and make appropriate changes. The login button is also not working and the user gets redirected back to the login page which is something you need to work on. Please ask questions on discord or join office hours if you need help figuring out the homework !
```
