let counties = require('./data/counties.json');

//This file mimics making asynchronous request to a database

module.exports = {
  getCounties: () => {
    return new Promise((resolve, reject) => {
      resolve(counties);
    });
  },

  getCounty: (countyParam) => {
    return new Promise((resolve, reject) => {
      let county = counties.find(county => county == countyParam);
      resolve(county);
    });


  },

  createCounty: (county) => {
    return new Promise((resolve, reject) => {
      counties.push(county);
      resolve(county);
    });
  },
};
