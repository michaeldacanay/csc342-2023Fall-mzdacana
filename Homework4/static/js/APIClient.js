// import {counties, parks} from './data.js';
const API_BASE = '/hw4/api';

class HTTPClient {
  static get(url) {
    return fetch(`${API_BASE}${url}`)
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        console.log('HTTPClient: get', `${API_BASE}${url}`);
        throw new Error('Network response was not ok.');
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static post(url, data) {
    return fetch(`${API_BASE}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {

    });
  }
};

export default {
  createHowl: (userId, text) => {
    console.log("APIClient: createHowl");
    return HTTPClient.post('/howls', {userId: userId, text: text});
  }, 

  // Get howls for userId
  getHowlsByUser: (userId) => {
    return HTTPClient.get(`/users/${userId}/howls`);
  },

  getHowlsByUserFollowing: (userId) => {
    console.log("APIClient: getHowlsByUserFollowing");
    return HTTPClient.get(`/users/${userId}/following/howls`);
  },

  getUsersFollowedByUserId: (userId) => {
    console.log("APIClient: getFollowsByUserId");
    return HTTPClient.get(`/users/${userId}/following`);
  },

  getUserById: (userId) => {
    console.log("APIClient: getUserById");
    return HTTPClient.get(`/users/${userId}`);
  },

  login: (username) => {
    console.log("APIClient: login", username);
    return HTTPClient.get(`/login/${username}`);
    // return HTTPClient.post('/users/login', {username: username});
  },

  logout: (userId) => {
    console.log("APIClient: logout");
    return HTTPClient.post('/logout', {userId: userId});
  },

  getCurrentUser: () => {
    return HTTPClient.get('/users/current');
  },

  follow: (userId, followingId) => {
    console.log("APIClient: follow");
    return HTTPClient.post(`/following`, {userId: userId, followingId: followingId});
  },

  unfollow: (userId, followingId) => {
    console.log("APIClient: unfollow", userId, followingId);
    return HTTPClient.post('/unfollowing', {userId: userId, followingId: followingId});
  },
};

