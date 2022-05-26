export const BASE_URL = 'http://localhost:3000/api';

export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Network > Fetxh/XHR > Books > Request Headers > Authorization
    // console.log('response ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    return data; // return resp.json();
  } catch (err) {
    console.log('error in getFetch:', err);
    throw err;
  }
}

// export async function postFetch(endpoint, data) {}
