let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function getGameState(req, res) {
    res.json({
        board: board,
        currentPlayer: currentPlayer,
        gameActive: gameActive
    });
}

function makeMove(req, res) {
    const index = parseInt(req.params.index);

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;

        if (checkWinner()) {
            gameActive = false;
            return res.json({ message: `${currentPlayer} Kazandı!`, board, currentPlayer });
        }

        if (!board.includes('')) {
            gameActive = false;
            return res.json({ message: 'Beraberlik!', board, currentPlayer });
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (currentPlayer === 'O' && gameActive) {
            aiMove();
        }

        return res.json({ message: 'Hamle yapıldı!', board, currentPlayer });
    }

    res.json({ message: 'Geçersiz hamle!', board, currentPlayer });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function aiMove() {
    const emptyIndices = board.map((val, index) => val === '' ? index : -1).filter(index => index !== -1);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = 'O';

    if (checkWinner()) {
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}

function resetGame(req, res) {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    res.json({ message: 'Yeni oyun başlatıldı', board, currentPlayer });
}

module.exports = {
    getGameState,
    makeMove,
    resetGame
};
