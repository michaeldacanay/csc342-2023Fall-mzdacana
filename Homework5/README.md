# Homework 4: Howler

1. An interesting challenge you encountered when implementing Howler. What was the issue, and how did you solve it?  
I faced a challenge in understanding the routes, data access objects, etc. There seems to be a lot of layers from the client frontend to api backend to json data. I had many doubts on which layer to place certain logic, for example, login/logout. I also had a difficult time understanding session/cookies and had to review the lecture slides to remember that objects like res.cookies requires installing middleware such as cookie-parser.

2. What additional feature would you add to Howler, and how would you suggest it should be implemented?  
With more time, I plan to add features like deleting howls that the current user has posted, creating new users, etc. Also, currently there is some disruption in the user experience with elements on the page that "flash", with elements being rendered. I am curious about methods to make this experience smoother.


## Changelog

Sun. 11/19 resubmission

- Update bootstrap pages: home, profile, login
- install middleware to track cookies/sessions fixing auth
- connect frontend to backend with APIClient e.g. create howl functionality
- display howls and follows lists dynamically via JS
- display profile page dynamically based on URL

