import api from './APIClient.js';


// Get userId from query string
const query = window.location.search;
let parameters = new URLSearchParams(query);
const userId = parseInt(parameters.get('userId'));

const usernameText = document.querySelector('.username-text');
const profileImage = document.querySelector('img#current-user-profile');
const profileImageLink = document.querySelector('.profile-image-link');

const userName = document.querySelector('div.user-name');
const userUsername = document.querySelector('div.user-username');
const userProfileImage = document.querySelector('img.user-profile');
const logoutBtn = document.querySelector('button.logout');
const followBtn = document.querySelector('button.follow');
const unfollowBtn = document.querySelector('button.unfollow');


const howlsList = document.querySelector('.howls-list');
const followsList = document.querySelector('.follows-list');

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('************************')

  api.getCurrentUser().then(user => {
    console.log('Profile: getCurrentUser: ', user)
    
    if (!user) {
      console.log('Profile: no user');
      window.location.href = './login';
    }
    currentUser = user;
    usernameText.innerHTML = '@' + user.username;
    profileImage.src = user.avatar || 'images/user_profile.png';
    profileImageLink.href = './profile?userId=' + user.id;


    // 3 scenarios: 1. userId in URL query string is currentUser
    //              2. userId is user that currentUser follows
    //              3. userId is user that currentUser does not follow

    if (user.id == userId) {
      // scenario 1: userId is currentUser
      logoutBtn.style.display = 'block';
      followBtn.style.display = 'none';
      unfollowBtn.style.display = 'none';
    } else {
      logoutBtn.style.display = 'none';
      
      
      api.getUsersFollowedByUserId(user.id).then(userIds => {
        // const userIds = data['following'];
        // console.log('Profile data: ', data)
        console.log('Profile userIds: ', userIds);
        console.log('Profile userId: ', userId);
        console.log('Profile userIds.includes(userId): ', userIds.includes(userId));

        if (userIds.includes(parseInt(userId))) {
          // scenario 2: userId is user that currentUser follows
          // followBtn.innerHTML = 'Unfollow';
          followBtn.style.display = 'none';
          unfollowBtn.style.display = 'block';
        } else {
          // scenario 3: userId is user that currentUser does not follow
          // followBtn.innerHTML = 'Follow';
          followBtn.style.display = 'block';
          unfollowBtn.style.display = 'none';
        }
      });
    }
    
  }).catch(error => {
    console.log('Profile: getCurrentUser error: ', error)
    window.location.href = './login';
  });

  // Get user info e.g. username, avatar (based on userId from query string)
  api.getUserById(userId).then(user => {
    console.log('Profile user: ', user);
    // Main info for userId
    userName.innerHTML = user.first_name + ' ' + user.last_name;
    userUsername.innerHTML = '@' + user.username;
    userProfileImage.src = user.avatar || 'images/user_profile.png';

    // Get users followed by userId
    api.getUsersFollowedByUserId(userId).then(userIds => {
      userIds.forEach(userId => {
        // Get user info for each userId
        api.getUserById(userId).then(user => {
          console.log('Profile user: ', user);
          followsList.append(createFollowHTML(user));
        });
      });
    });

    // Get howls for userId
    api.getHowlsByUser(userId).then(howls => {
      // Custom sort function to compare Date objects
      const compareDates = (a, b) => new Date(b.datetime) - new Date(a.datetime);

      const sortedHowls = howls.sort(compareDates);
      
      sortedHowls.forEach(howl => {
        // console.log('Profile howl: ', howl)
        // howl.userId  with this we can get the user info: username, 
        howlsList.append(createHowlHTML(user, howl));
        
      });
    });
  });
});


logoutBtn.addEventListener('click', () => {
  api.logout(currentUser.id).then(() => {
    window.location.href = './login';
  });
});

followBtn.addEventListener('click', () => {
  api.follow(currentUser.id, userId).then(() => {
    window.location.reload();
  });
});

unfollowBtn.addEventListener('click', () => {
  api.unfollow(currentUser.id, userId).then(data => {
    console.log('response data unfollow', data);
    console.log('unfollowBtn: ', currentUser.id, userId);
    window.location.reload();
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

/**
 * Create follow HTML.
 */
function createFollowHTML(user) {
  // Create the card body container
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'd-flex', 'align-items-center', 'gap-2');

  // Create the profile image link
  const profileImageLink = document.createElement('a');
  profileImageLink.href = './profile?userId=' + user.id;
  cardBody.appendChild(profileImageLink);

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
  cardBody.appendChild(userName);

  // Create the username with a muted text
  const usernameText = document.createElement('div');
  usernameText.classList.add('text-muted', 'me-auto');
  usernameText.innerHTML = '@' + user.username;
  cardBody.appendChild(usernameText);

  return cardBody;
}