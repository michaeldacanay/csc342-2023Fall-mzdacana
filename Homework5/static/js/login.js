import api from './APIClient.js';

const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  console.log('login.js username: ', username);
  console.log('login.js password: ', password);
  api.login(username, password).then(user => {
    console.log("login.js user: ", user);
    window.location.href = './';
  });
});