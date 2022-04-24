const BASE_URL = 'http://localhost:3000/api';

const cardsOutputEl = document.querySelector('.services-cards');

function displayServices(arr) {
  cardsOutputEl.innerHTML = '';
  arr.map((serviceObj) => {
    const cardEl = document.createElement('article');
    cardEl.classList.add('card', 'cardSer');
    cardsOutputEl.append(cardEl);

    const titleEl = document.createElement('h3');
    titleEl.classList = 'card__title';
    titleEl.textContent = `$${serviceObj.price} ${serviceObj.name}`;
    cardEl.append(titleEl);

    const subtEl = document.createElement('p');
    subtEl.classList = 'card__subtitle';
    subtEl.textContent = serviceObj.description;
    cardEl.append(subtEl);

    const lineEl = document.createElement('div');
    lineEl.classList = 'card__line';
    cardEl.append(lineEl);

    const btnDelEl = document.createElement('button');
    btnDelEl.classList.add('card__btn', 'btn-del');
    btnDelEl.innerHTML = '<i class="trash-icon fa fa-trash" aria-hidden="true"></i>';
    // eslint-disable-next-line no-underscore-dangle, no-use-before-define
    btnDelEl.addEventListener('click', () => deleteService(serviceObj._id));
    cardEl.append(btnDelEl);
  });
  // delete
  // document.querySelectorAll('.btn-del').forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     deleteService(`services/${e.target.id}`);
  //   });
  // });
}

// GET
async function getServices() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    // console.log(resp);
    // fetch does not pass the code to catch block if status is error
    if (!resp.ok) throw new Error('Something is wrong in get services');
    const servicesArr = await resp.json();
    // console.log('servicesArr', servicesArr);
    displayServices(servicesArr);
  } catch (error) {
    console.log('error ===', error);
  }
}
getServices();

// DELETE
async function deleteService(id) {
  const confirmation = confirm('Do you really want to delete it?');
  if (!confirmation) return;
  try {
    const resp = await fetch(`${BASE_URL}/services/${id}`, {
      method: 'DELETE',
    });
    console.log('resp', resp);
    // fetch does not pass the code to catch block if status is error
    if (!resp.ok) throw new Error('Something is wrong in deleting the service');
    // moved to BE:
    // const deleteResult = await resp.json();
    // console.log('deleteResult', deleteResult);
    // if (deleteResult.deletedCount === 1) {
    //   getServices();
    // }
    getServices();
  } catch (error) {
    console.log('error ===', error);
  }
}
