const BASE_URL = 'http://localhost:3000/api';

const cardsOutputEl = document.querySelector('.cards-section');

function displayServices(arr) {
  cardsOutputEl.innerHTML = '';
  arr.map((serviceObj) => {
    const cardsEl = document.createElement('article');
    cardsEl.classList = 'card';
    cardsOutputEl.append(cardsEl);

    const titleEl = document.createElement('h3');
    titleEl.classList = 'card__title';
    titleEl.textContent = `$${serviceObj.price} ${serviceObj.name}`;
    cardsEl.append(titleEl);

    const subtEl = document.createElement('p');
    subtEl.classList = 'card__subtitle';
    subtEl.textContent = serviceObj.description;
    cardsEl.append(subtEl);

    const lineEl = document.createElement('div');
    lineEl.classList = 'card__line';
    cardsEl.append(lineEl);

    const btnDelEl = document.createElement('button');
    btnDelEl.classList.add('card__btn', 'btn-del');
    btnDelEl.innerHTML = '<i class="trash-icon fa fa-trash" aria-hidden="true"></i>';
    btnDelEl.addEventListener('click', () => deleteService(serviceObj._id));
    cardsEl.append(btnDelEl);
  });
  // // delete
  // document.querySelectorAll('.btn-del').forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     deleteServices(`services/${e.target.id}`);
  //   });
  // });
}

// GET
async function getServices() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    // console.log(resp);
    // fetch does not pass the code to catch block if status is error
    if (!resp.ok) throw new Error('Something is wrong');
    const servicesArr = await resp.json();
    console.log('servicesArr', servicesArr);
    displayServices(servicesArr);
  } catch (error) {
    console.warn('error ===', error);
    console.log('error');
  }
}
getServices();

// DELETE
async function deleteService(id) {
  const confirmation = confirm('Do you really want to delete it?');
  if (!confirmation) return;
  try {
    const resp = await fetch(`${BASE_URL}/servicesr/${id}`, {
      method: 'DELETE',
    });
    console.log('resp', resp);
    // fetch does not pass the code to catch block if status is error
    if (!resp.ok) throw new Error('Something is wrong');
    const data = await resp.json();
    console.log('data', data);
    if (data.acknowledged) {
      getServices();
    }
  } catch (error) {
    console.warn('error ===', error);
    console.log('error');
  }
}
