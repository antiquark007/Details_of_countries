'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data, className = '') {
  // Extract languages and currencies from the data
  const languages = Object.values(data.languages).join(', ');
  const currencies = Object.values(data.currencies)
    .map(currency => currency.name)
    .join(', ');

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" alt="Flag of ${
    data.name.common
  }" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${languages}</p>
          <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
      </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(
      data => renderCountry(data[0]),
      err => alert(err)
    )
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}`);
    });
};

btn.addEventListener('click', function () {
  getCountryData('India');
});
// Call the function with a country name
