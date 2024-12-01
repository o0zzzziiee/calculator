let currentInput = "";
let currentOperator = "";
const buttons = document.querySelectorAll("[data-value]");
let result = document.querySelectorAll(".result")[0];
const clear = document.querySelector('[data-value="AC"]');
let equation = [];
let operator = false;
buttons.forEach((button, index) => {
  button.addEventListener("click", addValue(index));
});
function addValue(i) {
  return function () {
    const buttonValue = buttons[i].getAttribute("data-value");

    // Если это оператор, добавляем его в уравнение
    if (["/", "*", "+", "-"].includes(buttonValue)) {
      clicked(this);
      ifOperatorThanSwap(buttonValue);
    } else {
      // Если это число, добавляем в уравнение
      removeClicked();
      equation.push(buttonValue);

      // Обновляем отображение
      result.textContent = equation.join("");
    }
  };
}

function clicked(button) {
  removeClicked();
  button.classList.add("clicked");
}

function removeClicked() {
  let elems = document.querySelectorAll(".clicked");
  elems.forEach(function (el) {
    el.classList.remove("clicked");
  });
}

function calculate() {
  if (equation.length == 0) {
    return; // Если массив пуст, ничего не делаем
  } else {
    // Преобразуем массив уравнений в строку
    var expression = equation.join("");

    // Проверяем, чтобы выражение было корректным
    if (/[^0-9+\-*/().]/.test(expression)) {
      alert("Некорректное выражение!");
      return;
    }

    try {
      // Выполняем расчет из массива уравнений
      var answer = eval(expression);

      // Проверяем, является ли результат целым числом или с плавающей точкой
      if (answer % 1 === 0) {
        result.textContent = answer; // Обновляем текст с результатом
      } else {
        result.textContent = answer.toFixed(4); // Округляем до 4 знаков
      }

      // Очищаем массив уравнений и добавляем результат
      equation = [];
      equation.push(answer);
      operator = false; // Сбрасываем флаг оператора
    } catch (e) {
      alert("Ошибка вычисления: " + e.message);
    }
  }
}

function invert() {
  return function () {
    if (equation.length === 0) {
      return; // Если массив уравнений пуст, ничего не делаем
    } else {
      let number = result.getAttribute("data-value"); // Получаем число из атрибута data-value
      popNumberOfDigits(number); // Убираем предыдущие цифры из уравнения
      let inverted = number * -1; // Инвертируем число (умножаем на -1)
      equation.push(inverted); // Добавляем инвертированное число в уравнение
      result.setAttribute("data-value", inverted); // Записываем инвертированное число в атрибут
      result.textContent = inverted; // Отображаем на экране
    }
  };
}

function percent() {
  return function () {
    var number = result.getAttribute("data-value"); // Получаем число из атрибута data-value
    popNumberOfDigits(number); // Убираем цифры из уравнения
    var percentage = number * 0.01; // Переводим число в процент
    equation.push(percentage); // Добавляем процент в уравнение
    result.setAttribute("data-value", percentage.toFixed(2)); // Записываем процент в атрибут
    result.textContent = percentage.toFixed(2); // Отображаем на экране
  };
}

function ifOperatorThanSwap(str) {
  if (!operator) {
    equation.push(str); // Если оператор еще не был добавлен, добавляем его в уравнение
    operator = true;
  } else {
    equation.pop(); // Убираем предыдущий оператор
    equation.push(str); // Добавляем новый оператор
  }
}

function checkIfNum(v) {
  return !isNaN(v) && v !== null && v !== ""; // Проверяет, является ли v числом, не пустым и не null
}

function popNumberOfDigits(number) {
  var arr = number.toString().split(""); // Преобразуем число в строку, чтобы разделить на символы
  for (var i = 0; i < arr.length; i++) {
    // Удаляем элементы из массива equation
    equation.pop();
  }
}
