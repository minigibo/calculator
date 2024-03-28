import "./style.scss";
import { themeChange } from "./theme";
themeChange();

const inputButtons =
  document.querySelectorAll<HTMLButtonElement>(`.calculator__button`);

const outputScreen = document.querySelector<HTMLElement>(`.calculator__output`);

const previousTotalOutput =
  document.querySelector<HTMLElement>(`#previous-operand`);

const runningTotal: string[] = [];

if (!inputButtons || !outputScreen || !previousTotalOutput) {
  throw new Error(`issue with the query selectors`);
}

inputButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    const value = button.dataset.value;
    console.log(value);
  });
});
