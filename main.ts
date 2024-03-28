import "./style.scss";
import { themeChange } from "./theme";
themeChange();

const inputButtons =
  document.querySelectorAll<HTMLButtonElement>(`.calculator__button`);

const outputScreen = document.querySelector<HTMLElement>(`.calculator__output`);

const previousTotalOutput =
  document.querySelector<HTMLElement>(`#previous-operand`);

const currentTotalOutput =
  document.querySelector<HTMLElement>(`#current-operand`);

let currentInput = "";

if (
  !inputButtons ||
  !outputScreen ||
  !previousTotalOutput ||
  !currentTotalOutput
) {
  throw new Error(`issue with the query selectors`);
}

// try to get the previous operator to show the values that are being pressed
const outputScreenUpdate = (value: string) => {
  currentInput += value;
  const formattedInput = addCommas(currentInput);
  currentTotalOutput.innerText = formattedInput;
};

// format the input so it adds comma when there are 3 digits that are followed by another digit.
const addCommas = (numberString: string): string => {
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const clear = () => {
  previousTotalOutput.innerText = "";
  currentTotalOutput.innerText = "";
  currentInput = "";
};

// backspace that will convert the current display featuring commas back without the commas
const backSpace = () => {
  let currentText = currentTotalOutput.innerText.replace(/,/g, "");
  currentText = currentText.slice(0, -1);
  currentInput = currentText;
  currentText = addCommas(currentText);
  currentTotalOutput.innerText = currentText;
};

inputButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    const value = button.dataset.value;

    if (value == "ac") {
      clear();
    } else if (value === "del") {
      backSpace();
    } else {
      outputScreenUpdate(`${value}`);
    }
  });
});
