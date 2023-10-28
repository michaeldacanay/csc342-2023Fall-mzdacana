let users = require('./data/users.json');

//This file mimics making asynchronous request to a database

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            resolve(users);
        });
    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            const user = users.find(user => user.id == id);
            if(user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    },

    getUser: (username) => {
        return new Promise((resolve, reject) => {
            const user = users.find(user => user.username == username);
            if(user) {
                resolve(user);
            }
            else {
                reject();
            }
        });
    },
};