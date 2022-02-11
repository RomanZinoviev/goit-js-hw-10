import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfoEl = document.querySelector(".country-info");
const serchInputEl = document.querySelector("#search-box");

const inputSerchHandle = (event) => { 
    const text = event.target.value.trim();            
    fetchCountries(text).then(e => { doWaysOfMarkup(e); console.log(e) }).catch(err => { Notiflix.Notify.failure('Oops, there is no country with that name'); countryInfoEl.innerHTML = ""; });    
};
const doMarkupShort = (countryes) => {
    const markup = countryes.map(({ name, flags }) => {
        return `<li class="contry">
                <img src="${flags.svg}" alt="" class="contry__flag" width=60px>
                <h2 class="country__name">${name.official}</h2>
                                
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doMarkupFull = (country) => { 
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<li class="contry__full">
                <h2>${name.official}</h2>
                <img src="${flags.svg}" alt="" class="contry__flag" width=120px>
                <p class="contry__capital"><span class="coutry__text">Capital:</span> ${capital}</p>
                <p class="contry__population"><span class="coutry__text">Population:</span> ${population} person</p>
                <p class="contry__languages"><span class="coutry__text">Languages:</span> ${Object.values(languages)}</p>    
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doWaysOfMarkup = (array) => {
    if (array.length > 10) { countryInfoEl.innerHTML = ""; return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.'); }
    if (array.length >= 2 && array.length <= 10) { return doMarkupShort(array) }
    if (array.length === 1) { return doMarkupFull(array) }
    else { return countryInfoEl.innerHTML = ""; }
};

serchInputEl.addEventListener("input", debounce(inputSerchHandle, DEBOUNCE_DELAY));

