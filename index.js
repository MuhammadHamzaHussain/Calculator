// index.js

let calculation = "";
let currentInput = "";
let operator = "";

// Function to update the display
function updateDisplay() {
    document.getElementById("calculation").innerText = calculation;
    document.getElementById("result").innerText = currentInput || "0";
}

// Function to handle number button clicks
function appendNumber(number) {
    if (currentInput.length <= 10) { // Limit the input length
        currentInput += number;
        updateDisplay();
    }
}

// Function to handle operator button clicks
function chooseOperator(selectedOperator) {
    if (currentInput === "" && calculation === "") return;
    if (currentInput !== "") {
        if (calculation) {
            performCalculation(); // Perform calculation if an operator is already present
        }
        calculation = currentInput;
        currentInput = "";
    }
    operator = selectedOperator;
    calculation += ` ${operator} `;
    updateDisplay();
}

// Function to perform the calculation
function performCalculation() {
    if (operator === "") return;
    const calculationParts = calculation.split(" ");
    const num1 = parseFloat(calculationParts[0]);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;

    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    calculation = "";
    operator = "";
    updateDisplay();
}

// Function to reset the calculator (AC)
function resetCalculator() {
    calculation = "";
    currentInput = "";
    operator = "";
    updateDisplay();
}

// Event listeners for buttons
document.querySelectorAll('.seven, .four, .one, .zero').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const number = e.target.innerText;
        appendNumber(number);
    });
});

document.querySelector('.plus').addEventListener('click', () => chooseOperator('+'));
document.querySelector('.minus').addEventListener('click', () => chooseOperator('-'));
document.querySelector('.cross').addEventListener('click', () => chooseOperator('*'));
document.querySelector('.divide').addEventListener('click', () => chooseOperator('/'));

document.querySelector('.equal').addEventListener('click', performCalculation);

document.querySelector('.ac').addEventListener('click', resetCalculator);

// Initial display update
updateDisplay();
