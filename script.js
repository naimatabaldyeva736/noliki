document.addEventListener('DOMContentLoaded', () => {
    const mainMenu = document.getElementById('main-menu');
    const gameScreen = document.getElementById('game-screen');
    const startGameBtn = document.getElementById('start-game-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const restartBtn = document.getElementById('restart-btn');
    const menuBtn = document.getElementById('menu-btn');
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = '❌'; 
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // ряды
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // колонки
        [0, 4, 8], [2, 4, 6]            // диагонали
    ];

    // Безопасный переход в игру
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            gameScreen.classList.add('active');
            startNewGame();
        });
    }

    // Возврат в главное меню
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            gameScreen.classList.remove('active');
            mainMenu.classList.add('active');
        });
    }

    // Клик по игровым клеткам
    function handleCellClick(e) {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[cellIndex] !== '' || !isGameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer === '❌' ? 'x' : 'o');

        checkResultValidation();
    }

    // Проверка победы или ничьей
    function checkResultValidation() {
        let roundWon = false;
        let winningCombo = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === '' || board[b] === '' || board[c] === '') {
                continue;
            }
            if (board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                winningCombo = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            gameStatus.innerHTML = `🎉 Победил игрок ${currentPlayer}!`;
            isGameActive = false;
            
            winningCombo.forEach(index => {
                cells[index].classList.add('winner');
            });
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            gameStatus.innerHTML = `🤝 Ничья!`;
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
        gameStatus.innerHTML = `Ход игрока ${currentPlayer}`;
    }

    // Сброс и очистка игрового поля
    function startNewGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = '❌';
        if (gameStatus) {
            gameStatus.innerHTML = `Ход игрока ${currentPlayer}`;
        }

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });
    }

    if (newGameBtn) newGameBtn.addEventListener('click', startNewGame);
    if (restartBtn) restartBtn.addEventListener('click', startNewGame);

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});