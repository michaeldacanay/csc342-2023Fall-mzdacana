let counties = require('./data/counties.json');
let parks = require('./data/parks.json');

//This file mimics making asynchronous request to a database
module.exports = {
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

}

