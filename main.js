let currentInput = "";

function updateDisplay(value) {
  const display = document.querySelector(".result");
  if (display.textContent === "0" && value !== ".") {
    display.textContent = "";
  }
  display.textContent += value;
  currentInput += value;
}

function clearScreen() {
  const display = document.querySelector(".result");
  display.textContent = "0";
  currentInput = "";
}

function calculateResult() {
  try {
    if (["+", "-", "x", "/"].includes(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }
    let result = currentInput.replace(/x/g, "*").replace(/\//g, "/");
    result = new Function("return " + result)();
    document.querySelector(".result").textContent = result;
    currentInput = result.toString();
  } catch (error) {
    document.querySelector(".result").textContent = "Error";
    currentInput = "";
  }
}

function toggleSign() {
  const display = document.querySelector(".result");
  let currentValue = parseFloat(display.textContent);
  if (!isNaN(currentValue)) {
    currentValue = -currentValue;
    display.textContent = currentValue;
    currentInput = currentValue.toString();
  }
}

function calculatePercentage() {
  const display = document.querySelector(".result");
  const currentValue = parseFloat(display.textContent);
  if (!isNaN(currentValue)) {
    const percentage = currentValue / 100;
    display.textContent = percentage;
    currentInput = percentage.toString();
  }
}

function updateOperator(operator) {
  if (currentInput === "" && operator !== "-") {
    return;
  }
  if (["+", "-", "x", "/"].includes(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1);
  }
  const display = document.querySelector(".result");
  display.textContent += operator;
  currentInput += operator;
}

function addDecimal() {
  const display = document.querySelector(".result");
  if (!currentInput.includes(".") || /[+\-x/]/.test(currentInput.slice(-1))) {
    display.textContent += ".";
    currentInput += ".";
  }
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.getAttribute("data-value");

    if (value >= "0" && value <= "9") {
      updateDisplay(value);
    } else if (value === "AC") {
      clearScreen();
    } else if (value === "=") {
      calculateResult();
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === "%") {
      calculatePercentage();
    } else if (["/", "x", "-", "+"].includes(value)) {
      updateOperator(value);
    } else if (value === ".") {
      addDecimal();
    }
  });
});
