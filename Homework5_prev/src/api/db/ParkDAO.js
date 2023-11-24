let parks = require('./data/parks.json');

//This file mimics making asynchronous request to a database
module.exports = {
  getParks: () => {
    return new Promise((resolve, reject) => {
      resolve(parks);
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
      resolve(park);
    });
  },

  createPark: (park) => {
    return new Promise((resolve, reject) => {
      parks.push(park);
      resolve(park);
    });
  },

};
