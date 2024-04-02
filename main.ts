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

// running the selector standard error procedure
if (
  !inputButtons ||
  !outputScreen ||
  !previousTotalOutput ||
  !currentTotalOutput
) {
  throw new Error(`issue with the query selectors`);
}

// function that handles output when buttons pressed
const outputScreenUpdate = (value: string) => {
  const decimalPointCheck = currentInput.includes(".");
  if (currentInput.length + value.length > 15) {
    return;
  }
  if (currentInput === "" && value === "%") {
    return;
  }
  if (currentInput === "0" && value === "0") {
    return;
  }
  if (decimalPointCheck && value === ".") {
    return;
  }
  currentInput += value;
  const formattedInput = addCommas(currentInput);
  currentTotalOutput.innerText = formattedInput;
};

// formatting function for if the output is too large to display to convert to expotential
const formatNumber = (number: number): string => {
  const numString = number.toString();
  const maxLength = 15;
  if (numString.length > maxLength) {
    return number.toExponential();
  } else return addCommas(numString);
};

// format the input to adds comma within the output number
const addCommas = (numberString: string): string => {
  if (numberString === "0" || /^0\d+/.test(numberString)) {
    return numberString;
  }
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// will set the innerText of both the previous and current display to empty
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

// function to change sign when +/- pressed
const signChange = (value: string) => {
  if (currentInput === "" && value === "+-") {
    return;
  }
  if (currentInput === "." && value === "+-") {
    return;
  }
  const currentText = currentTotalOutput.innerText.replace(/,/g, "");
  const newValue = parseFloat(currentText) * -1;
  currentInput = newValue.toString();
  currentInput = addCommas(currentInput);
  currentTotalOutput.innerText = currentInput;
};

// function that when an operation button is pressed moves the current display and the operation to the previous display
const moveValueToPrevious = (operator: string) => {
  const currentValue = currentTotalOutput.innerText.replace(/,/g, "");
  if (
    currentInput === "." &&
    (operator === "/" ||
      operator === "*" ||
      operator === "+" ||
      operator === "-")
  ) {
    return;
  }
  if (currentValue !== "") {
    previousTotalOutput.innerText = `${currentValue} ${operator}`;
    currentTotalOutput.innerText = "";
    currentInput = "";
  }
};

// calculation function using switch case to determine which operation to carry out
const calculationOperation = (value: string) => {
  if (currentInput === "" && value === "=") {
    return;
  }
  const previousValue = parseFloat(
    previousTotalOutput.innerText.replace(/,/g, "")
  );
  const currentValue = parseFloat(
    currentTotalOutput.innerText.replace(/,/g, "")
  );
  const operation = previousTotalOutput.innerText.split(" ")[1];
  let result: number;
  switch (operation) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "*":
      result = previousValue * currentValue;
      break;
    case "/":
      if (currentValue === 0) {
        currentTotalOutput.innerText = "Well done you broke me";
        setTimeout(() => {
          currentTotalOutput.innerText = "";
          previousTotalOutput.innerText = "";
        }, 3000);
        return;
      }
      result = previousValue / currentValue;
      break;
    default:
      throw new Error("Invalid operation");
  }
  currentTotalOutput.innerText = formatNumber(result);
  previousTotalOutput.innerText = "";
};

// function for if % button is pressed divides  current output by 100
const percentage = (value: string) => {
  if (currentInput === "" && value === "%") {
    return;
  }
  if (currentInput === "." && value === "%") {
    return;
  }
  const currentValue = currentTotalOutput.innerText.replace(/,/g, "");
  if (previousTotalOutput.innerText) {
    const previousValue = parseFloat(
      previousTotalOutput.innerText.split(" ")[0].replace(/,/g, "")
    );
    const percentageValue = (parseFloat(currentValue) / previousValue) * 100;
    currentTotalOutput.innerText = percentageValue.toFixed(2).toString();
  } else {
    const percentageValue = parseFloat(currentValue) / 100;
    currentTotalOutput.innerText = percentageValue.toFixed(2).toString();
  }
  currentTotalOutput.innerText = addCommas(currentTotalOutput.innerText);
};

// running for each loop that using an event listenener to run each time one of the calculator buttons are pressed
inputButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    const value = button.dataset.value;

    if (value === "ac") {
      clear();
    } else if (
      value === "/" ||
      value === "*" ||
      value === "-" ||
      value === "+"
    ) {
      if (previousTotalOutput.innerText && currentTotalOutput.innerText) {
        calculationOperation(`${value}`);
      }
      moveValueToPrevious(value);
    } else if (value === "%") {
      percentage(`${value}`);
    } else if (value === "+-") {
      signChange(`${value}`);
    } else if (value === "del") {
      backSpace();
    } else if (value === "=") {
      calculationOperation(`${value}`);
    } else {
      outputScreenUpdate(`${value}`);
    }
  });
});
