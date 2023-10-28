let howls = require('../data/howls.json');

//This file mimics making asynchronous request to a database

module.exports = {
    getHowls: () => {
        return new Promise((resolve, reject) => {
            resolve(howls);
        });
    },

    getHowlById: (id) => {
        return new Promise((resolve, reject) => {
            const howl = howls.find(follow => follow.id == id);
            if(howl) {
                resolve(howl);
            }
            else {
                reject();
            }
        });
    }
};