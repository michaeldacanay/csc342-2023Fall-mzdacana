let follows = require('../data/follows.json');

//This file mimics making asynchronous request to a database

module.exports = {
    getFollows: () => {
        return new Promise((resolve, reject) => {
            resolve(follows);
        });
    },

    getFollowById: (id) => {
        return new Promise((resolve, reject) => {
            const follow = follows.find(follow => follow.id == id);
            if(follow) {
                resolve(follow);
            }
            else {
                reject();
            }
        });
    }
};