const BASE_URL = 'http://localhost:3000/api';

async function getServices() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    // console.log(resp);
    // fetch nepermeta kodo i catch bloka jei status yra klaidos
    if (!resp.ok) throw new Error('Something is wrong');
    const servicesArr = await resp.json();
    console.log('servicesArr', servicesArr);
    // display(servicesArr);
  } catch (error) {
    console.warn('error ===', error);
    console.log('error');
  }
}
getServices();
