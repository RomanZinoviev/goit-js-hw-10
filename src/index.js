import './css/styles.css';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const countryInfoEl = document.querySelector(".country-info");
const serchInputEl = document.querySelector("#search-box");


const inputSerchHandle = (event) => { 
    const text = event.target.value;
       
    // const serchTextWithDelay = debounce(serchText, DEBOUNCE_DELAY);
    fetchCountries(text).then(e => { doWaysOfMarkup(e); console.log(e.length) }).catch(err => { console.log(err) });
    if (text === "") { serchInputEl.innerHTML = "" };
};
const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
    );
};
const doMarkupFull = (countryes) => {
    const markup = countryes.map(({ name, capital, population, flags, languages }) => {
        return `<li class="contry">
                <h2>${name.official}</h2>
                <img src="${flags.svg}" alt="" class="contry__flag" width=120px>                
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doMarkupShort = (country) => { 
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<li class="contry">
                <h2>${name.official}</h2>
                <img src="${flags.svg}" alt="" class="contry__flag" width=120px>
                <p class="contry__capital">${capital}</p>
                <p class="contry__population">${population}</p>
                <p class="contry__languages">${languages}</p>    
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doWaysOfMarkup = (array) => {
    if (array.length > 10) { Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.'); }
    if (array.length >= 2 && array.length <= 10) { doMarkupShort(array) }
    else{doMarkupFull(array)}
}


serchInputEl.addEventListener("input", inputSerchHandle)

