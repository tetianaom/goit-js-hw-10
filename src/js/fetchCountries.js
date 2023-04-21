const BASE_URL = 'https://restcountries.com/v3.1/';
const filterParams = new URLSearchParams({
  fields: 'name,capital,population,flag,languages',
});

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${filterParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText || res.status.toString());
    }

    return res.json();
  });
}
