import "./style.scss";
import { themeChange } from "./theme";
themeChange();

const inputButtons =
  document.querySelectorAll<HTMLButtonElement>(`.calculator__button`);

const outputScreen = document.querySelector<HTMLElement>(`.calculator__output`);

const previousTotalOutput =
  document.querySelector<HTMLElement>(`#previous-operand`);

let currentInput = "";

if (!inputButtons || !outputScreen || !previousTotalOutput) {
  throw new Error(`issue with the query selectors`);
}

// try to get the previous operator to show the values that are being pressed
const outputScreenUpdate = (value: string) => {
  currentInput += value;
  previousTotalOutput.innerText = currentInput;
};

inputButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    const value = button.dataset.value;
    console.log(value);
    outputScreenUpdate(`${value}`);
  });
});
