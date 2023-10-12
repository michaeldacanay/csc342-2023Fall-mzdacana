import api from './APIClient_mock.js';

const countiesSelect = document.querySelector('#counties-select');
countiesSelect.addEventListener('change', e => {
  updateParks()
});

api.getCounties().then(counties => {
  counties.forEach(county => {
    const option = document.createElement('option');
    option.innerHTML = county;
    option.value = county;
    countiesSelect.append(option);
  });
  updateParks();
});


function updateParks() {
  const cIndex = countiesSelect.selectedIndex;
  const county = countiesSelect[cIndex].value;
  api.getParksByCounty(county).then(parks => {
    resetParks();
    fillParksHTML(parks);
  });
}

/**
 * Clear current parks
 */
function resetParks(parks) {
  const parkList = document.getElementById('parks-list');
  parkList.innerHTML = '';
}

/**
 * Create all parks HTML and add them to the webpage.
 */
function fillParksHTML(parks) {
  const parkList = document.getElementById('parks-list');
  parks.forEach(park => {
    parkList.append(createParkHTML(park));
  });

}

/**
 * Create park HTML.
 */
function createParkHTML(park) {
  const item = document.createElement('a');
  item.classList.add('park');
  item.href = '/park?id=' + park.id;

  const name = document.createElement('h2');
  name.innerHTML = park.name;
  item.appendChild(name);

  const img = document.createElement('img');
  img.src = "/img/park.jpg";
  item.appendChild(img);

  const countyLabel = document.createElement('div');
  countyLabel.innerHTML = 'Spans Counties:';
  countyLabel.classList.add('counties-list');
  item.appendChild(countyLabel);

  park.county.forEach(county => {
    const countyTag = document.createElement('span');
    countyTag.classList.add('county');
    countyTag.innerHTML = county;
    item.appendChild(countyTag);
  });

  return item;
}