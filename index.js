document.addEventListener("DOMContentLoaded", function () {
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
            if (typeof calcResult === 'number') {
                calcResult = parseFloat(calcResult.toFixed(5));
                lastResult = calcResult; 
            }
            result.textContent = calcResult;
            expression = calcResult.toString(); 
            newOperation = true; 
    }

    function handleClear() {
        expression = "";
        lastResult = null; 
        newOperation = false;
        result.textContent = "";
        updateDisplay();
    }

    // Event listeners for numbers
    document.querySelectorAll(".seven, .four, .one, .zero").forEach(button => {
        button.addEventListener("click", function () {
            handleNumber(this.textContent.trim());
        });
    });

    // Event listeners for operators
    document.querySelector(".plus").addEventListener("click", function () {
        handleOperator("+");
    });

    document.querySelector(".minus").addEventListener("click", function () {
        handleOperator("-");
    });

    document.querySelector(".cross").addEventListener("click", function () {
        handleOperator("*");
    });

    document.querySelector(".divide").addEventListener("click", function () {
        handleOperator("/");
    });

    // Event listener for equal
    document.querySelector(".equal").addEventListener("click", handleEqual);

    // Event listener for clear
    document.querySelector(".ac").addEventListener("click", handleClear);

    // Event listener for dot
    document.querySelector(".dot").addEventListener("click", handleDot);
});
