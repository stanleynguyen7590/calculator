const numericBtn = document.querySelectorAll(".numeric");
const operatorBtn = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".AC");
const dotBtn = document.querySelector(".dot");
const plusMinusBtn = document.querySelector(".plus_minus");
const percentageBtn = document.querySelector(".percentage");

let firstOperand = "";
let secondOperand = "";
let shouldResetScreen = "";
let currentOperation = null;
let shouldResetDisplay = false;

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

let handleAppendNumber = item => {
  resetOperatorBtnStyle();
  if (display.innerText === "0" || shouldResetDisplay) resetDisplay();
  if (display.innerText.length < 9) display.innerText += item.innerText;
};

let handleAppendPoint = () => {
  if (shouldResetDisplay) resetDisplay();
  if (display.innerText === "") display.innerText = "0";
  if (display.innerText.includes(".")) return;
  display.innerText += ".";
};

let handleToggleNegative = () => {
  if (shouldResetDisplay) resetDisplay();
  if (display.innerText === "" || display.innerText === "0") return;
  if (!display.innerText.includes("-"))
    display.innerText = "-" + display.innerText;
  else display.innerText = display.innerText.slice(1);
};

let handlePercentage = () => {
  if (display.innerText === "") return;
  display.innerText = Number(display.innerText) / 100;
};

let handleSetOperator = item => {
  if (currentOperation !== null || shouldResetDisplay) evaluate();
  currentOperation = item.innerText;
  firstOperand = display.innerText;
  updateOperatorBtnStyle(currentOperation);
  shouldResetDisplay = true;
};

let clear = () => {
  display.innerText = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
  resetOperatorBtnStyle();
};

let evaluate = () => {
  if (currentOperation === null || shouldResetDisplay) return;
  if (currentOperation === "\u00F7" && display.innerText === "0") {
    display.innerText = "You can't divide by 0!";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
    shouldResetDisplay = true;
    return;
  }
  secondOperand = display.innerText;
  display.innerText = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
  shouldResetDisplay = true;
};

let resetDisplay = () => {
  display.innerText = "";
  shouldResetDisplay = false;
};

let updateOperatorBtnStyle = currentOperation => {
  operatorBtn.forEach(item => {
    if (item.innerText === currentOperation) {
      item.style.backgroundColor = "#fff";
      item.style.color = "#ff9500";
    } else {
      item.style.backgroundColor = "#ff9500";
      item.style.color = "#fff";
    }
  });
};

let resetOperatorBtnStyle = () => {
  operatorBtn.forEach(item => {
    item.style.backgroundColor = "#ff9500";
    item.style.color = "#fff";
  });
};

let operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "\u00D7":
      return multiply(a, b);
    case "\u00F7":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
};

let roundResult = number => {
  return Math.round(number * 1000) / 1000;
};

operatorBtn.forEach(item =>
  item.addEventListener("click", () => {
    handleSetOperator(item);
  })
);

numericBtn.forEach(item =>
  item.addEventListener("click", () => {
    handleAppendNumber(item);
  })
);

equalBtn.addEventListener("click", evaluate);

clearBtn.addEventListener("click", clear);

dotBtn.addEventListener("click", handleAppendPoint);

plusMinusBtn.addEventListener("click", handleToggleNegative);

percentageBtn.addEventListener("click", handlePercentage);
