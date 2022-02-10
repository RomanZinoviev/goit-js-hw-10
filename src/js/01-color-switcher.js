const bodyEl = document.querySelector("body");
const buttonStartEl = document.querySelector("button[data-start]");
const buttonStopEl = document.querySelector("button[data-stop]");
let timerId = null;

const changeBodyStyleHandler = () => {
    buttonStopEl.disabled = false;
    buttonStartEl.disabled = true;
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
        
    }, 1000);    
};
const stopChangeBodyColor = () => {
    clearInterval(timerId);
    buttonStartEl.disabled = false;
    buttonStopEl.disabled = true;
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

buttonStopEl.disabled = true;
buttonStartEl.addEventListener("click", changeBodyStyleHandler);
buttonStopEl.addEventListener("click", stopChangeBodyColor);

