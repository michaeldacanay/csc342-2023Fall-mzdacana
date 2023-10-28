// import {counties, parks} from './data.js';
const API_BASE = '/api';

class HTTPClient {
  static get(url) {
    return fetch(`${API_BASE}${url}`)
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static post(url, data) {
    // TODO: Implement
  }
};

export default {
  getCounties: () => {
    return new Promise((resolve, reject) => {
      resolve(counties);
    });
  },

  getParksByCounty: (county) => {
    return new Promise((resolve, reject) => {
      const results = parks.filter(park => !county || county ==='all' || park.county.includes(county));
      resolve(results);
    });
  },

  getParkById: (id) => {
    return new Promise((resolve, reject) => {
      const park = parks.find(park => park.id == id);
      if(park) {
        resolve(park);
      }
      else {
        reject();
      }
    });
  },
};
