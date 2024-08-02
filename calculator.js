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
        clearValues();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
      case "Enter":
        //operate
        manageOperation(input);
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

let previousNumber, previousOperator;
let displayValue = "0";
let overwriteDisplay = true; //overwrite the displayed number on next digit input

function setDisplayValue(value) {
  let formattedValue = "0";

  //value could be a string or a number
  if (typeof value === "number") {
    //truncate to fit the display if required
    formattedValue = value.toString();

    if (Number.isInteger(value)) {
      //TODO handle exponentials
    } else if (formattedValue.length > displayLength) {
      console.log("Value: " + value);

      if (value < 1) {
        formattedValue = value.toPrecision(displayLength - 2);
      } else {
        formattedValue = value.toPrecision(displayLength - 1);
      }

      //remove any trailing [.0] from the formattedValue
      const regEx = /\.{1}0+$/i;
      formattedValue = formattedValue.replace(regEx, "");
    }
  } else if (typeof value === "string") {
    formattedValue = value;
  }

  displayValue = formattedValue;
  display.innerHTML = formattedValue;
}
function addToDisplay(digit) {
  if (overwriteDisplay) {
    if (digit === ".") {
      setDisplayValue("0.");
    } else {
      setDisplayValue(digit);
    }
    overwriteDisplay = false;
  } else if (displayValue.length < displayLength) {
    //do nothing if we've reached the maximum display character length
    if (digit === "." && displayValue.includes(".")) {
      //don't add a second "."
    } else if (displayValue === "0") {
      setDisplayValue(digit);
    } else {
      setDisplayValue(displayValue + digit);
    }
  }
}

function manageOperation(operator) {
  let currentNumber, result;

  //if firstNumber isn't set then set it to the current display value & set operator
  if (previousNumber === undefined) {
    previousNumber = Number(displayValue);
    previousOperator = operator;
  } else {
    //if firstNumber is set, then operate on firstNumber and current display value
    //then set operator to the new operator value
    //and set the value of firstNumber to the result

    currentNumber = Number(displayValue);
    console.log("currentNumber: " + currentNumber);

    result = operate(previousOperator, previousNumber, currentNumber);
    setDisplayValue(result);

    previousNumber = result;
    previousOperator = operator;
  }

  overwriteDisplay = true;
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
    default:
      return number2;
  }
}

function clearDisplay() {
  setDisplayValue("0");
  overwriteDisplay = true;
}
function clearValues() {
  previousNumber = undefined;
  previousOperator = "";
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
