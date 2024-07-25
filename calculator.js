const validInput = [
  "AC",
  "Escape",
  "+/-",
  "%",
  "/",
  "*",
  "-",
  "+",
  "=",
  "Enter",
  ".",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
];

const displayLength = 10;

const calculator = document.querySelector("#calculator");
const buttons = document.querySelector("#buttons");
const display = document.querySelector("#display");

/*
------------------------------------------------------------------------------
  Handle Events
*/
document.addEventListener("keyup", handleKeyPress);
buttons.addEventListener("click", handleButtonClick);

function handleKeyPress(e) {
  handleInput(e.key);
}
function handleButtonClick(e) {
  handleInput(e.target.textContent);
}

function handleInput(input) {
  if (validInput.includes(input)) {
    console.log(input);

    switch (input) {
      case "AC":
      case "Escape":
        clearDisplay();
        break;
      case "9":
      case "8":
      case "7":
      case "6":
      case "5":
      case "4":
      case "3":
      case "2":
      case "1":
      case "0":
      case ".":
        //keypad digits
        addToDisplay(input);
        break;
    }
  }
}

/*
------------------------------------------------------------------------------
  Perform Calculations
*/

let firstNumber, operator, secondNumber;
let displayValue = "0";

function setDisplayValue(value) {
  displayValue = value;
  display.innerHTML = value;
}
function addToDisplay(digit) {
  //do nothing if we've reached the maximum display character length
  if (displayValue.length < displayLength) {
    switch (digit) {
      case ".":
        //if the digit is a "." then add it unless there's already a "."
        if (displayValue.includes(".") === false)
          setDisplayValue(displayValue + digit);
        break;
      default:
        //don't add another 0 if the displayValue is just a "0"
        if (displayValue === "0") {
          setDisplayValue(digit);
        } else {
          setDisplayValue(displayValue + digit);
        }
    }

    //if the display is currently "0", replace it with this digit unless it's a "."
  }
}

function operate(operator, number1, number2) {
  switch (operator) {
    case "+":
      return add(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "*":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
  }
}

function clearDisplay() {
  setDisplayValue("0");
}

function add(number1, number2) {
  return number1 + number2;
}
function subtract(number1, number2) {
  return number1 - number2;
}
function multiply(number1, number2) {
  return number1 * number2;
}
function divide(number1, number2) {
  if (number2 === 0) return 0;
  return number1 / number2;
}
