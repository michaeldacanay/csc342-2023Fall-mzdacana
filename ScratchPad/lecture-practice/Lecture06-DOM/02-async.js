console.clear();

// SYNC

function fetchSync(URL) {
    let result;
    console.log('1. Open connection to ' + URL);
    console.log('2. Send request');
    console.log('3. Receive and parse response');
    result = {body: "It works!", status: 200};
    return result;
}

console.log('Work before request');
console.log('Response', fetchSync('https://ncsu.edu'));
console.log('Work after request');

//problem: if network requests takes some time

// ASYNC 1

// function fetchAsync(URL) {
//     let result;
//     setTimeout(() => {
//         console.log('Async 1. Open connection to ' + URL);
//         console.log('Async 2. Send request');
//         console.log('Async 3. Receive and parse response');
//         result = {body: "It works!", status: 200};
//     }, 5000);

//     return result;
// }

// console.log('Work before request');
// console.log('Response', fetchAsync('https://ncsu.edu'));
// console.log('Work after request');


// ASYNC 2 (WITH CALLBACK)

// function fetchAsync2(URL, callback) {
//     let result;
//     setTimeout(() => {
//         console.log('Async 2 1. Open connection to ' + URL);
//         console.log('Async 2 2. Send request');
//         console.log('Async 2 3. Receive and parse response');
//         result = {body: "Async 2 It works!", status: 200};
//         callback(result);
//     }, 5000);

//     return result;
// }

// function onResult(result) {
//     console.log("Async 2 result received", result);
// }

// console.log('Async 2 Work before request');
// console.log('Async 2 Response', fetchAsync2('https://ncsu.edu', onResult));
// console.log('Async 2 Work after request');

// PROMISES

console.clear();

function fetch(URL) {
    return new Promise((resolve, reject) => {
        let result;
        setTimeout(() => {
            console.log('Promise 1. Open connection to ' + URL);
            console.log('Promise 2. Send request');
            console.log('Promise 3. Receive and parse response');
            result = {body: "Promise body: It works!", status: 200};
            resolve(result);
        }, 5000);
    });
}

console.log('Async 3 Work before request');

fetch("http://google.com").then((result) => {
    console.log("Promise result", result);
}).catch((error) => {
    console.log(error);
});
console.log('Async 3 Work after request');



// let promise = fetch("http://google2.com");
// promise.then(onResult).catch((error) => {
//     console.log(error);
// });
// promise.catch((error) =>{});

