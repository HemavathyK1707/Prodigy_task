document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const currentPlayerElement = document.getElementById('current-player');
    
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let scoreX = 0;
    let scoreO = 0;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? '#f44336' : '#2196F3';

        if (checkWinner()) {
            updateScore();
            highlightWinningCells();
            alert(`${currentPlayer} wins!`);
        } else if (gameState.every(cell => cell)) {
            alert('Draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerElement.textContent = currentPlayer;
        }
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function highlightWinningCells() {
        winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
            }
        });
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        currentPlayer = 'X';
        currentPlayerElement.textContent = currentPlayer;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});

