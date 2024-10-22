document.addEventListener("DOMContentLoaded", function () {
    let calculation = document.getElementById("calculation");
    let result = document.getElementById("result");
    let expression = "";

    function updateDisplay() {
        calculation.textContent = expression;
    }

    // Function to handle number input
    function handleNumber(num) {
        expression += num;
        updateDisplay();
    }

    // Function to handle operator input
    function handleOperator(op) {
        // Only add operator if there is no existing operator at the end
        if (expression && !isNaN(expression[expression.length - 1])) {
            expression += op;
            updateDisplay();
        }
    }

    // Function to perform calculation
    function calculateExpression(expr) {
        try {
            // Evaluate the expression using JavaScript's eval (for basic operations only)
            return eval(expr);
        } catch (error) {
            return "Error";
        }
    }

    // Function to handle equal button
    function handleEqual() {
        if (expression) {
            let calcResult = calculateExpression(expression);
            result.textContent = calcResult;
            expression = calcResult.toString();
            updateDisplay();
        }
    }

    // Function to handle clear button
    function handleClear() {
        expression = "";
        result.textContent = "";
        updateDisplay();
    }

    // Event listeners for buttons
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
});
