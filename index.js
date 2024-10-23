document.addEventListener("DOMContentLoaded", function () {
    let calculation = document.getElementById("calculation");
    let result = document.getElementById("result");
    let expression = "";

    function updateDisplay() {
        calculation.textContent =  expression;
    }

    function handleNumber(num) {
        expression += num;
        updateDisplay();
    }

    function handleOperator(op) {
        if (expression && !isNaN(expression[expression.length - 1])) {
            expression += op;
            updateDisplay();
        }
    }

    function handleDot() {
        if (expression === "" || /[+\-*/]$/.test(expression)) {
            expression += "0.";
        }
        else if (!/\.\d*$/.test(expression)) {
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
        if (expression) {
            let calcResult = calculateExpression(expression);
            result.textContent = calcResult;
        }
    }

    function handleClear() {
        expression = "";
        result.textContent = "";
        updateDisplay();
    }

    document.querySelectorAll(".seven, .four, .one, .zero").forEach(button => {
        button.addEventListener("click", function () {
            handleNumber(this.textContent.trim());
        });
    });

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

    document.querySelector(".equal").addEventListener("click", handleEqual);

    document.querySelector(".ac").addEventListener("click", handleClear);

    document.querySelector(".dot").addEventListener("click", handleDot);
});
