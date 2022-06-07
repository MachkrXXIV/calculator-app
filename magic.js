const btns = document.querySelectorAll("button");
const digits = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector("#clear");
const negativeToggle = document.querySelector(".negative-toggle");
const allClearBtn = document.querySelector("#all-clear");
const equalsBtn = document.querySelector(".operator.equal");
const currentOutput = document.querySelector("#current-output");
const inputDisplay = document.querySelector("#input-display");

let firstNum = "";
let currentOperator = "";
let secondNum = "";
let multi = "\u00D7";
let div = "\u00F7";
let hasTotal = false;
let calculation = inputDisplay.textContent;

window.addEventListener("keydown", keyControl);
deleteBtn.addEventListener("click", () => erase());
allClearBtn.addEventListener("click", () => clearAll());
equalsBtn.addEventListener("click", () => evaluate());

for (let digit of digits) {
  digit.addEventListener("click", (e) => appendNum(digit.textContent));
}

for (let operator of operatorBtns) {
  operator.addEventListener("click", (e) => {
    let isNum = /^\d+$/.test(inputDisplay.textContent.slice(-1));
    if (!isNum) return;
    setOperation(operator.textContent);
  });
}

function appendNum(digit) {
  if (inputDisplay.textContent === "") {
    firstNum = inputDisplay.textContent;
  }
  inputDisplay.textContent += digit;
  let operationMarker = inputDisplay.textContent.indexOf(currentOperator);
  if (inputDisplay.textContent.slice(operationMarker + 1).length > 0) {
    let twoNums = inputDisplay.textContent.split(currentOperator);
    firstNum = twoNums[0];
    secondNum = twoNums[1];
    console.log(firstNum);
    console.log(secondNum);
  }
}

function clearAll() {
  firstNum = "";
  secondNum = "";
  currentOperator = "";
  hasTotal = false;
  currentOutput.textContent = "";
  inputDisplay.textContent = "";
}

function convertKeyboardOperator(operator) {
  if (operator === "+") return "+";
  if (operator === "-") return "-";
  if (operator === "*") return multi;
  if (operator === "/") return div;
}

function keyControl(action) {
  if (action.key >= 0 && action.key <= 9) appendNum(action.key);
  if (action.key === "Backspace") erase();
  if (action.key === "Backslash") clearAll();
  if (action.key === "Enter") evaluate();
  if (
    action.key === "+" ||
    action.key === "-" ||
    action.key === "*" ||
    action.key === "/"
  ) {
    setOperation(convertKeyboardOperator(action.key));
  }
}

function erase() {
  inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
}

function evaluate() {
  let solution = operate(currentOperator, firstNum, secondNum);
  currentOutput.textContent = solution;
  hasTotal = true;
}

function setOperation(operator) {
  if (operator === "=") return;
  currentOperator = operator;
  if (hasTotal) {
    resetScreen();
    inputDisplay.textContent = currentOutput.textContent;
  }
  inputDisplay.textContent += operator;
}

function resetScreen() {
  inputDisplay.textContent = "";
}

function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case multi:
      return multiply(num1, num2);
    case div:
      if (num2 === 0) return null;
      return divide(num1, num2);
    default:
      return null;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
