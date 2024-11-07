const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

function makeMove(index) {
    fetch(`/make-move/${index}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            updateBoard(data.board);
            if (data.message) {
                statusDiv.textContent = data.message;
            }
        });
}

function updateBoard(board) {
    board.forEach((cell, index) => {
        cells[index].textContent = cell;
    });
}

function getGameState() {
    fetch('/state')
        .then(response => response.json())
        .then(data => {
            updateBoard(data.board);
            statusDiv.textContent = data.gameActive ? `${data.currentPlayer}'ın sırası` : 'Oyun Bitti!';
        });
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        makeMove(index);
    });
});

resetButton.addEventListener('click', () => {
    fetch('/reset', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            updateBoard(data.board);
            statusDiv.textContent = `${data.currentPlayer}'ın sırası`;
        });
});

getGameState();
