let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

// Check if there's a winner
const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            message.textContent = `${currentPlayer} Wins! 🎉`;
            message.style.color = '#4CAF50';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        message.textContent = "It's a Draw! 😞";
        message.style.color = '#FF5722';
    }
};

// Handle cell click
const handleClick = (e) => {
    if (gameOver) return;

    const index = e.target.getAttribute('data-index');

    if (gameBoard[index]) return; // Cell already taken

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
};

// Reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = '';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });

    resetBtn.disabled = false;
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
