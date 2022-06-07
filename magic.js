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
let operation = "";
let secondNum = "";

for (let digit of digits) {
  digit.addEventListener("click", (e) => appendNum(digit.textContent));
}

for (let operator of operatorBtns) {
  operator.addEventListener("click", (e) => {
    let isNum = /^\d+$/.test(inputDisplay.textContent.slice(-1));
    if (!isNum) return;
    selectOperator(operator.textContent);
  });
}

function appendNum(digit) {
  inputDisplay.textContent += digit;
}

function selectOperator(operator) {
  if (operator === "=") return;
  inputDisplay.textContent += operator;
}

function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);

  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
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
