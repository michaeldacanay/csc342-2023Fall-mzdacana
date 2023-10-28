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
    },

    getFollowingByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            // Get users followed by user with given userId
            const following = follows[userId].following;
            if(following) {
                resolve(following);
            }
            else {
                reject();
            }
        });
    },

    createFollow: (userId, followingId) => {
        return new Promise((resolve, reject) => {
            // let userFollows = follows[userId].following;
            // don't have to account for if userId is new because there is no create account functionality
            if(userId in follows) {
                follows[userId].following.push(followingId);
                resolve(follows[userId]);
            }
            else {
                reject();
            }
        });
    },

    deleteFollow: (userId, followingId) => {
        return new Promise((resolve, reject) => {
            // let userFollows = follows[userId].following;
            // don't have to account for if userId is new because there is no create account functionality
            if(userId in follows) {
                follows[userId].following = follows[userId].following.filter(id => id !== followingId);
                resolve(follows[userId]);
            }
            else {
                reject();
            }
        });
    },
};