import api from './APIClient.js';

const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', () => {
  const username = document.querySelector('#username').value;
  api.login(username).then(user => {
    console.log(user);
    window.location.href = './';
  });
});