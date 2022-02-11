import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfoEl = document.querySelector(".country-info");
const serchInputEl = document.querySelector("#search-box");

const inputSerchHandle = (event) => { 
    const text = event.target.value.trim();            
    fetchCountries(text).then(e => { doWaysOfMarkup(e); console.log(e)}).catch(err => { console.log(err) });    
};
const doMarkupShort = (countryes) => {
    const markup = countryes.map(({ name, flags }) => {
        return `<li class="contry">
                <h2>${name.official}</h2>
                <img src="${flags.svg}" alt="" class="contry__flag" width=40px>                
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doMarkupFull = (country) => { 
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<li class="contry">
                <h2>${name.official}</h2>
                <img src="${flags.svg}" alt="" class="contry__flag" width=120px>
                <p class="contry__capital">Capital: ${capital}</p>
                <p class="contry__population">Population: ${population}person</p>
                <p class="contry__languages">Languages: ${Object.values(languages)}</p>    
        </li>`
    }).join("");
    countryInfoEl.innerHTML = markup;
};
const doWaysOfMarkup = (array) => {
    if (array.length > 10) { return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.'); }
    if (array.length >= 2 && array.length <= 10) { return doMarkupShort(array) }
    if (array.length === 1) { return doMarkupFull(array) }
    else { return countryInfoEl.innerHTML = ""; }
};

serchInputEl.addEventListener("input", debounce(inputSerchHandle, DEBOUNCE_DELAY))

