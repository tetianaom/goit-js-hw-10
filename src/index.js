import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
console.log('first');

const search = document.querySelector('#search-box');
const info = document.querySelector('.country-info');
const list = document.querySelector('.country-list');
search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const value = evt.target.value.trim();
  info.innerHTML = '';
  list.innerHTML = '';

  if (value) {
    fetchCountries(value).then(renderResults).catch(onFetchError);
  }
}

function onFetchError(err) {
  if (err.message === 'Not Found') {
    return Notify.failure('Oops, there is no country with that name');
  }

  return Notify.failure('Something went wrong');
}

function renderResults(data) {
  if (!data) {
    return;
  }

  if (data.length > 10) {
    Notify.info(
      'Too many matches are found. Please enter a more specific name.'
    );
    return;
  }

  if (data.length === 1) {
    info.innerHTML = createMarkupItem(data);
    return;
  }

  if (data.length > 1 && data.length <= 10) {
    list.innerHTML = createMarkupList(data);
    return;
  }
}

function createMarkupList(arr) {
  return arr
    .map(
      ({ name: { common }, flag }) => `<li class="item">
      <h2 class="country-name"><span class="flag">${flag}</span> ${common}</h2>
      </li>`
    )
    .join('');
}

function createMarkupItem(arr) {
  if (arr.length === 1) {
    return arr
      .map(
        ({ name: { common }, capital, population, flag, languages }) => `
      <h2 class="country-name"><span class="flag">${flag}</span> ${common}</h2>
      <p><span class="bold">Capital:</span> ${capital}</p>
      <p><span class="bold">Population:</span> ${population}</p>
    <p><span class="bold">Languages:</span> ${Object.values(languages)}</p>`
      )
      .join('');
  }
}
