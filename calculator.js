const validInput = [
  "AC",
  "+/-",
  "%",
  "/",
  "*",
  "-",
  "+",
  "=",
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

const calculator = document.querySelector("#calculator");
const buttons = document.querySelector("#buttons");

calculator.addEventListener("keyup", handleKeyPress);
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
  }
}
