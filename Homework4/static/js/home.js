import api from './APIClient.js';

const howlsList = document.querySelector('.howls-list');

document.addEventListener('DOMContentLoaded', () => {
  api.getHowlsByUserFollowing('1').then(howls => {
    console.log("From the server:", howls);
    console.log(typeof(howls)); // object
    
    howls.forEach(howl => {
      console.log('howl: ', howl)
      // howl.userId  with this we can get the user info: username, 
      api.getUserById(howl.userId).then(user => {
        console.log('user: ', user);
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




function updateHowls(userId) {
  api.getHowlsByUserFollowing(userId).then(howls => {
    resetHowls();
    fillHowlsHTML(howls);
  });
}

/**
 * Clear current howls
 */
function resetHowls() {
  howlsList.innerHTML = '';
}

/**
 * Create all howls HTML and add them to the webpage.
 */
function fillHowlsHTML(howls) {
  howls.forEach(howl => {
    howlsList.append(createHowlHTML(howl));
  });
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
  profileImageLink.href = './profile';
  cardHeader.appendChild(profileImageLink);

  // Create the profile image
  const profileImage = document.createElement('img');
  profileImage.src = user.avatar || 'images/user_profile.png';
  profileImage.classList.add('img-fluid', 'rounded', 'profile');
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
