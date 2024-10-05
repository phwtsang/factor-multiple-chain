const gridSize = 10;
let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
let currentRow = 0;
let currentCol = 0;
let chainLength = 0;
let usedNumbers = new Set();

const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');

// Create the grid in the table
function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    const row = gameBoard.insertRow();
    for (let j = 0; j < gridSize; j++) {
      const cell = row.insertCell();
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.max = '100';
      input.addEventListener('input', () => handleInput(i, j, input));
      cell.appendChild(input);
    }
  }
}

function handleInput(row, col, input) {
  const num = parseInt(input.value);

  // Basic validation
  if (isNaN(num) || num < 1 || num > 100) {
    input.classList.add('invalid');
    message.textContent = "Invalid input. Please enter a number between 1 and 100.";
    return;
  }

  // Check if the number is already used
  if (usedNumbers.has(num)) {
    input.classList.add('invalid');
    message.textContent = "This number is already used. Please enter a different number.";
    return;
  }

  // First entry
