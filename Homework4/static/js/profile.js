import api from './APIClient.js';


// Get userId from query string
const query = window.location.search;
let parameters = new URLSearchParams(query);
const userId = parameters.get('userId');

const usernameText = document.querySelector('.username-text');
const profileImage = document.querySelector('img#current-user-profile');

const userName = document.querySelector('div.user-name');
const userUsername = document.querySelector('div.user-username');
const userProfileImage = document.querySelector('img.user-profile');
const logoutBtn = document.querySelector('button.logout');
const followBtn = document.querySelector('button.follow');

const howlsList = document.querySelector('.howls-list');

// let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  api.getCurrentUser().then(user => {
    if (!user) {
      window.location.href = './login';
    }
    usernameText.innerHTML = '@' + user.username;
    profileImage.src = user.avatar || 'images/user_profile.png';

    if (user.id == userId) {
      // hide the follow button if profile page is for currentUser
      window.location.href = './';
      // hide the logout button if profile page is not for currentUser
      logoutBtn.style.display = 'block';
      followBtn.style.display = 'none';
    } else {
      logoutBtn.style.display = 'none';
      followBtn.style.display = 'block';
    }
    
  });

  // Get user info e.g. username, avatar
  api.getUserById(userId).then(user => {
    console.log('Profile user: ', user);
    userName.innerHTML = user.first_name + ' ' + user.last_name;
    userUsername.innerHTML = '@' + user.username;
    userProfileImage.src = user.avatar || 'images/user_profile.png';

    // Get howls for userId
    api.getHowlsByUser(userId).then(howls => {
      
      howls.forEach(howl => {
        console.log('Profile howl: ', howl)
        // howl.userId  with this we can get the user info: username, 
        howlsList.append(createHowlHTML(user, howl));
        
      });
    });
  });
});


function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}


/**
 * Create howl HTML.
 */
function createHowlHTML(user, howl) {
  // Create the main card container
  const card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  // Create the card header
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header', 'd-flex', 'align-items-center', 'gap-2');
  card.appendChild(cardHeader);

  // Create the profile image link
  const profileImageLink = document.createElement('a');
  profileImageLink.href = './profile?userId=' + user.id;
  cardHeader.appendChild(profileImageLink);

  // Create the profile image
  const profileImage = document.createElement('img');
  profileImage.src = user.avatar || 'images/user_profile.png';
  profileImage.classList.add('img-fluid', 'rounded-circle', 'profile');
  profileImage.alt = 'profile image';
  profileImageLink.appendChild(profileImage);

  // Create the user name
  const userName = document.createElement('div');
  userName.classList.add('fw-bold');
  userName.innerHTML = user.first_name + ' ' + user.last_name;
  cardHeader.appendChild(userName);

  // Create the username with a muted text
  const usernameText = document.createElement('div');
  usernameText.classList.add('text-muted', 'me-auto');
  usernameText.innerHTML = '@' + user.username;
  cardHeader.appendChild(usernameText);

  // Create the timestamp
  const timestamp = document.createElement('div');
  timestamp.classList.add('p2');
  timestamp.innerHTML = formatTimestamp(howl.datetime);
  cardHeader.appendChild(timestamp);

  // Create the card body
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  // Create the card text
  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerHTML = howl.text;
  cardBody.appendChild(cardText);

  return card;
}