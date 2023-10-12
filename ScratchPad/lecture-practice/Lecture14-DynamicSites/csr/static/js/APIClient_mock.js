import {counties, parks} from './data.js';

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
