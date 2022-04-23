const BASE_URL = 'http://localhost:3000/api';

const cardsOutputEl = document.querySelector('.users-cards');

function displayUsers(arr) {
  cardsOutputEl.innerHTML = '';
  arr.map((userObj) => {
    const cardEl = document.createElement('article');
    cardEl.classList.add('card', 'cardUs');
    cardsOutputEl.append(cardEl);

    const fullnameEl = document.createElement('h4');
    fullnameEl.classList = 'cardUs__fullname';
    fullnameEl.textContent = `${userObj.name} ${userObj.surname}`;
    cardEl.append(fullnameEl);

    const emailEl = document.createElement('p');
    emailEl.classList = 'cardUs__email';
    emailEl.textContent = 'Email Address: ';
    cardEl.append(emailEl);

    const emailSpanEl = document.createElement('span');
    emailSpanEl.classList.add('cardUs__email_span', 'accent1');
    emailSpanEl.textContent = userObj.email;
    emailEl.append(emailSpanEl);

    const serviceEl = document.createElement('p');
    serviceEl.classList = 'cardUs__service';
    serviceEl.textContent = 'Membership: ';
    cardEl.append(serviceEl);

    const serviceSpanEl = document.createElement('span');
    serviceSpanEl.classList.add('cardUs__service_span', 'accent1');
    serviceSpanEl.textContent = userObj.service_id;
    serviceEl.append(serviceSpanEl);

    const ipEl = document.createElement('p');
    ipEl.classList = 'cardUs__ip';
    ipEl.textContent = 'ip: 78.20.42.19';
    cardEl.append(ipEl);
  });
}

// GET
async function getUsers() {
  try {
    const resp = await fetch(`${BASE_URL}/users`);
    console.log(resp);
    // fetch does not pass the code to catch block if status is error
    if (!resp.ok) throw new Error('Something is wrong');
    const usersArr = await resp.json();
    console.log('usersArr', usersArr);
    displayUsers(usersArr);
  } catch (error) {
    console.warn('error ===', error);
    console.log('error');
  }
}
getUsers();
