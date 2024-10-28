document.addEventListener("DOMContentLoaded", function() {
  let calculation = document.getElementById("calculation");
  let result = document.getElementById("result");
  let expression = "";
  let lastResult = null;
  let newOperation = false;

  function updateDisplay() {
    calculation.textContent = expression;
  }

  function handleNumber(num) {
    if (newOperation) {
      expression = "";
      result.textContent = "";
      newOperation = false;
    }
    expression += num;
    updateDisplay();
  }

  function handleOperator(op) {
    if (lastResult !== null && !newOperation) {
      expression = lastResult.toString();
      lastResult = null;
    }
    if (expression && !/[+\-*/]$/.test(expression)) {
      expression += op;
      updateDisplay();
      newOperation = false;
    }
  }

  function handleDot() {
    if (newOperation) {
      expression = "0.";
      newOperation = false;
    } else if (expression === "" || /[+\-*/]$/.test(expression)) {
      expression += "0.";
    } else if (!/\.\d*$/.test(expression)) {
      expression += ".";
    }
    updateDisplay();
  }

  function calculateExpression(expr) {
    try {
      return eval(expr);
    } catch (error) {
      return "Error";
    }
  }

  function handleEqual() {
    if (expression && !/[+\-*/]$/.test(expression)) {
      let calcResult = calculateExpression(expression);
      if (typeof calcResult === "number") {
        calcResult = parseFloat(calcResult.toFixed(5));
        lastResult = calcResult;
      }
      result.textContent = calcResult;
      expression = calcResult.toString();
      newOperation = true;
    }
  }

  function handleClear() {
    expression = "";
    lastResult = null;
    newOperation = false;
    result.textContent = "";
    updateDisplay();
  }

  function handleBackspace() {
    if (newOperation) {
      expression = "";
      newOperation = false;
    } else {
      expression = expression.slice(0, -1);
    }
    updateDisplay();
  }

  function handlePlusMinus() {
    // Toggle the sign of the last number
    const lastNumberMatch = expression.match(/(-?\d+(\.\d+)?)$/);
    if (lastNumberMatch) {
      const lastNumber = lastNumberMatch[0];
      const newLastNumber = lastNumber.startsWith('-') ? lastNumber.slice(1) : '-' + lastNumber;
      expression = expression.slice(0, -lastNumber.length) + newLastNumber;
    } else if (!expression) {
      // If empty, start with negative sign
      expression = "-";
    }
    updateDisplay();
  }

  // Event listeners for buttons
  document.querySelectorAll(".seven, .four, .one, .zero").forEach(button => {
    button.addEventListener("click", function() {
      handleNumber(this.textContent.trim());
    });
  });

  document.querySelector(".plus").addEventListener("click", function() {
    handleOperator("+");
  });

  document.querySelector(".minus").addEventListener("click", function() {
    handleOperator("-");
  });

  document.querySelector(".cross").addEventListener("click", function() {
    handleOperator("*");
  });

  document.querySelector(".divide").addEventListener("click", function() {
    handleOperator("/");
  });

  document.querySelector(".equal").addEventListener("click", handleEqual);
  document.querySelector(".ac").addEventListener("click", handleClear);
  document.querySelector(".dot").addEventListener("click", handleDot);
  document.querySelector(".fa-arrow-left").parentElement.addEventListener("click", handleBackspace);
  document.querySelector(".fa-plus-minus").parentElement.addEventListener("click", handlePlusMinus);

  updateDisplay();
});
