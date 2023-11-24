import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';

export default {
  getCounties: () => {
    return HTTPClient.get(API_BASE+'/counties')
  },

  getParksByCounty: (county) => {
    return HTTPClient.get(API_BASE+"/counties/" + county + "/parks");
  },

  getParkById: (id) => {
    return HTTPClient.get(API_BASE+`/parks/${id}`);
  },

  getCurrentUser: () => {
    return HTTPClient.get(API_BASE+'/users/current');
  },

  logIn: (username, password) => {
    let data = {
      username: username,
      password: password
    }
    return HTTPClient.post(API_BASE+'/users/login', data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE+'/users/logout', {});
  }
};
