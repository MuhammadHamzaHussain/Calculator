// Selecting the elements that will display the calculation and result
const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');

// Variables to store the current calculation and result
let currentCalculation = '';
let currentResult = 0;
let isNewInput = false; // To track new input after an operation

// Function to update the display
const updateDisplay = () => {
    calculationDisplay.innerText = currentCalculation;
    resultDisplay.innerText = currentResult;
}

// Function to handle button clicks for numbers and operations
const handleButtonClick = (value) => {
    // If it's a new input after a result (and a number is clicked), reset the calculation
    if (isNewInput) {
        currentCalculation = ''; 
        isNewInput = false;
    }

    // Add clicked value to the calculation string
    currentCalculation += value;
    updateDisplay();
}

// Function to handle operations
const handleOperation = (operator) => {
    if (currentCalculation === '' && operator !== '=') {
        // If nothing is entered, do not process an operator
        return;
    }

    // Calculate the result when the equals button is clicked
    if (operator === '=') {
        try {
            currentResult = eval(currentCalculation); // Using eval to calculate the string
            currentCalculation = currentResult.toString(); // Allow further operations on the result
            isNewInput = true; // Mark that the next input should reset the calculation
        } catch (error) {
            currentResult = 'Error';
        }
    } else {
        // If user presses an operator after the result, continue calculation
        if (isNewInput) {
            currentCalculation = currentResult.toString();
            isNewInput = false;
        }
        currentCalculation += ` ${operator} `;
    }

    updateDisplay();
}

// Function to reset the calculator
const resetCalculator = () => {
    currentCalculation = '';
    currentResult = 0;
    isNewInput = false;
    updateDisplay();
}

// Adding event listeners to each button
document.querySelectorAll('.seven, .four, .one, .zero').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.innerText.trim()));
});

// Operation buttons
document.querySelector('.ac').addEventListener('click', resetCalculator);
document.querySelector('.divide').addEventListener('click', () => handleOperation('/'));
document.querySelector('.cross').addEventListener('click', () => handleOperation('*'));
document.querySelector('.minus').addEventListener('click', () => handleOperation('-'));
document.querySelector('.plus').addEventListener('click', () => handleOperation('+'));
document.querySelector('.equal').addEventListener('click', () => handleOperation('='));

// Handling decimal point
document.querySelector('.dot').addEventListener('click', () => handleButtonClick('.'));
