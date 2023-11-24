let howls = require('./data/howls.json');

//This file mimics making asynchronous request to a database

module.exports = {
    getHowls: () => {
        return new Promise((resolve, reject) => {
            resolve(howls);
        });
    },

    getHowlById: (id) => {
        return new Promise((resolve, reject) => {
            const howl = howls.find(howl => howl.id == id);
            if(howl) {
                resolve(howl);
            }
            else {
                reject();
            }
        });
    },

    getHowlsByUserId: (userId) => {
        console.log('HowlDAO userId: ', userId);
        return new Promise((resolve, reject) => {
            const filteredHowls = howls.filter(howl => howl.userId == userId);
            if(filteredHowls) {
                resolve(filteredHowls);
            }
            else {
                reject();
            }
        });
    },

    createHowl: (howl) => {
        const howlId = howls.length + 1;
        const newHowl = {
            id: howlId,
            userId: howl.userId,
            datetime: howl.datetime,
            text: howl.text,
        };
        return new Promise((resolve, reject) => {
            howls.push(newHowl);
            resolve(newHowl);
        });
    },
};