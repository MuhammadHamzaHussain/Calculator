document.addEventListener("DOMContentLoaded", function () {
    let calculation = document.getElementById("calculation");
    let result = document.getElementById("result");
    let currentInput = "";
    let operator = "";
    let firstNumber = null;

    function updateDisplay() {
        calculation.textContent = currentInput;
    }

    // Function to handle number input
    function handleNumber(num) {
        currentInput += num;
        updateDisplay();
    }

    // Function to handle operator input
    function handleOperator(op) {
        if (firstNumber === null) {
            firstNumber = parseFloat(currentInput);
        } else if (currentInput) {
            firstNumber = calculate(firstNumber, parseFloat(currentInput), operator);
        }
        operator = op;
        currentInput = "";
        updateDisplay();
    }

    // Function to perform calculation
    function calculate(num1, num2, op) {
        switch (op) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Error";
            default:
                return num2;
        }
    }

    // Function to handle equal button
    function handleEqual() {
        if (operator && currentInput) {
            let secondNumber = parseFloat(currentInput);
            let calcResult = calculate(firstNumber, secondNumber, operator);
            result.textContent = calcResult;
            currentInput = calcResult.toString();
            firstNumber = null;
            operator = "";
        }
    }

    // Function to handle clear button
    function handleClear() {
        currentInput = "";
        firstNumber = null;
        operator = "";
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
