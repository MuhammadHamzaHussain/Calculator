// index.js

// Get DOM elements
const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');

// Variables to store current input, previous input, and the selected operator
let currentInput = '';
let previousInput = '';
let operator = null;
let result = null;
let shouldReset = false;

// Update display with the current calculation and result
function updateDisplay() {
    calculationDisplay.innerText = `${previousInput} ${operator || ''} ${currentInput}`;
    resultDisplay.innerText = result || currentInput || '0';
}

// Handle number button click
function handleNumber(number) {
    if (shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Handle operator button click
function handleOperator(op) {
    if (currentInput === '' && result !== null) {
        previousInput = result;
    } else if (currentInput !== '') {
        if (previousInput !== '') {
            calculate(); // Perform previous calculation
        }
        previousInput = currentInput;
        currentInput = '';
    }
    operator = op;
    shouldReset = false;
    updateDisplay();
}

// Perform the calculation
function calculate() {
    if (operator === null || previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    shouldReset = true;
    updateDisplay();
}

// Handle AC (All Clear) button
function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    result = null;
    shouldReset = false;
    updateDisplay();
}

// Handle +/- button (negate the current input)
function handleNegate() {
    if (currentInput === '') return;
    currentInput = (-parseFloat(currentInput)).toString();
    updateDisplay();
}

// Handle % button (convert to percentage)
function handlePercentage() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Handle equal button
function handleEqual() {
    calculate();
}

// Handle decimal button
function handleDecimal() {
    if (currentInput.includes('.')) return;
    currentInput += '.';
    updateDisplay();
}

// Add event listeners to buttons
document.querySelectorAll('.seven h2, .four h2, .one h2, .zero h2').forEach(button => {
    button.addEventListener('click', (e) => handleNumber(e.target.innerText));
});

document.querySelector('.plus').addEventListener('click', () => handleOperator('+'));
document.querySelector('.minus').addEventListener('click', () => handleOperator('-'));
document.querySelector('.cross').addEventListener('click', () => handleOperator('*'));
document.querySelector('.divide').addEventListener('click', () => handleOperator('/'));

document.querySelector('.equal').addEventListener('click', handleEqual);
document.querySelector('.ac').addEventListener('click', handleClear);
document.querySelector('.fa-plus-minus').parentElement.addEventListener('click', handleNegate);
document.querySelector('.fa-percent').parentElement.addEventListener('click', handlePercentage);
document.querySelector('.dot').addEventListener('click', handleDecimal);

// Initialize display
updateDisplay();
