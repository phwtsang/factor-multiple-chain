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
  if (row === 0 && col === 0) {
    grid[row][col] = num;
    usedNumbers.add(num);
    chainLength++;
    message.textContent = "";
    return;
  }

  // Check if the number is a factor or multiple of the previous number
  const prevNum = grid[row][col - 1];
  if (num !== prevNum && (num % prevNum === 0 || prevNum % num === 0)) {
    grid[row][col] = num;
    usedNumbers.add(num);
    chainLength++;
    input.classList.remove('invalid');
    message.textContent = "";

    // Move to the next cell
    if (col < gridSize - 1) {
      currentCol++;
    } else {
      currentRow++;
      currentCol = 0;
    }

    // Check if the game is over
    if (currentRow === gridSize) {
      gameOver();
      return;
    }

    // Check if there are no valid moves left
    if (!hasValidMoves(num)) {
      gameOver();
      return;
    }
  } else {
    input.classList.add('invalid');
    message.textContent = "Invalid move. The number must be a factor or multiple of the previous number.";
  }
}

function hasValidMoves(num) {
  for (let i = 1; i <= 100; i++) {
    if (!usedNumbers.has(i) && (i % num === 0 || num % i === 0)) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  message.textContent = "Game Over! Your chain length is " + chainLength;
  // Disable all inputs
  const inputs = gameBoard.querySelectorAll('input');
  inputs.forEach(input => input.disabled = true);
}

createGrid();
