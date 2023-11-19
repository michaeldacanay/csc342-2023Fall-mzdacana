// import {counties, parks} from './data.js';
const API_BASE = '/api';

// class HTTPClient {
//   static get(url) {
//     return fetch(`${API_BASE}${url}`)
//     .then(res => {
//         if(res.ok) {
//           return res.json();
//         }
//         throw new Error('Network response was not ok.');
//       })
//       .catch(err => {
//         console.log(err);
//         throw err;
//       });
//   }

//   static post(url, data) {
//     return fetch(`${API_BASE}${url}`, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => {

//     });
//   }
// };

export default {
  // Get howls for userId
  getHowlsByUser: (userId) => {
    return HTTPClient.get(`/users/${userId}/howls`);
  },

  getHowlsByUserFollowing: (userId) => {
    console.log("From the server:");
    return HTTPClient.get(`/users/${userId}/following/howls`);
  },
  // getHowlsByUserFollowing: () => {

  // }

  getCurrentUser: () => {
    return HTTPClient.get('/users/current');
  }
};

