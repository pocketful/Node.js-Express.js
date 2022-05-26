export function createCard(serviceObj) {
  const cardEl = document.createElement('article');
  cardEl.classList = 'card';
  cardsOutputEl.append(cardEl);

  makeEl('h3', text, cardEl, (elClass = null));
}

function makeEl(tagName, text, dest, elClass = null) {}

arr.map((serviceObj) => {
  const cardEl = document.createElement('article');
  cardEl.classList = 'card';
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
