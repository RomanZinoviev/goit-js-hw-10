import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const inputDateTime = document.querySelector("#datetime-picker");
const startButtonEl = document.querySelector("button[data-start]");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");
const date = new Date();
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {    
       if (selectedDates[0].getTime() < date.getTime()) {
          Notiflix.Notify.failure("Please choose a date in the future");          
      } else {
          startButtonEl.disabled = false;
        };        
        
        const startTimerHandle = () => { 
          intervalId = setInterval(() => {            
            const currentTime = Date.now();
            const timeToAction = convertMs(selectedDates[0].getTime() - currentTime);
            const { days, hours, minutes, seconds } = timeToAction;            
              daysEl.textContent = days;
              hoursEl.textContent = hours;
              minutesEl.textContent = minutes;
            secondsEl.textContent = seconds;
            if (selectedDates[0].getTime() - currentTime <1000) { clearInterval(intervalId) };            
          }, 1000)   
};
        
        startButtonEl.addEventListener("click", startTimerHandle);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours =addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds =addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};

startButtonEl.disabled = true;
flatpickr("input#datetime-picker", options);




