document.addEventListener("DOMContentLoaded", function () {
    let calculation = document.getElementById("calculation");
    let result = document.getElementById("result");
    let expression = "";
    let lastResult = null; // To store the result of the last calculation
    let newOperation = false; // To track if the user is starting a new operation after a result

    function updateDisplay() {
        calculation.textContent = expression;
    }

    function handleNumber(num) {
        if (newOperation) {
            // Start a new expression after a result
            expression = "";
            result.textContent = "";
            newOperation = false;
        }
        expression += num;
        updateDisplay();
    }

    function handleOperator(op) {
        if (lastResult !== null && !newOperation) {
            // Use the last result as the base for the next operation
            expression = lastResult.toString();
            lastResult = null;
        }
        if (expression && !/[+\-*/]$/.test(expression)) {
            // Append the operator only if the last character is not an operator
            expression += op;
            updateDisplay();
            newOperation = false; // Continue appending to the current expression
        }
    }

    function handleDot() {
        if (newOperation) {
            // Reset the expression if starting a new operation
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
            return eval(expr); // You may want to replace eval with a safer alternative
        } catch (error) {
            return "Error";
        }
    }

    function handleEqual() {
        if (expression && !/[+\-*/]$/.test(expression)) {
            let calcResult = calculateExpression(expression);
            if (typeof calcResult === 'number') {
                calcResult = parseFloat(calcResult.toFixed(5)); // Format result to 5 decimal points
                lastResult = calcResult; // Store the result for further operations
            }
            result.textContent = calcResult;
            expression = calcResult.toString(); // Reset the expression to the result for continued operations
            newOperation = true; // Flag that a new operation might begin
        }
    }

    function handleClear() {
        expression = "";
        lastResult = null; // Clear last result
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
