import Notiflix from 'notiflix';

const countryInfoEl = document.querySelector(".country-info");

export const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then(
        (response) => {
            if (!response.ok) { 
                countryInfoEl.innerHTML = "";
                throw Notiflix.Notify.failure('Oops, there is no country with that name');                
            }
            return response.json();
        }
    );
};