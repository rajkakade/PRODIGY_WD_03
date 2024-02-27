 document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Function to check for a winner
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        return null; // No winner yet
    };

    // Function to check for a tie
    const checkTie = () => {
        return boardState.every(cell => cell !== "");
    };

    // Function to update the message
    const updateMessage = () => {
        const winner = checkWinner();

        if (winner) {
            message.textContent = `Player ${winner} wins!`;
        } else if (checkTie()) {
            message.textContent = "It's a tie!";
        } else {
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    // Function to handle cell clicks
    const handleCellClick = (index) => {
        if (boardState[index] || checkWinner()) {
            return; // Cell already filled or game already won
        }

        boardState[index] = currentPlayer;
        renderBoard();
        
        const winner = checkWinner();
        if (winner) {
            message.textContent = `Player ${winner} wins!`;
        } else if (checkTie()) {
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage();
        }
    };

    // Function to render the board
    const renderBoard = () => {
        board.innerHTML = "";
        boardState.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = value;
            cell.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cell);
        });
    };

    // Function to reset the game
    const resetGame = () => {
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        updateMessage();
    };

    // Event listener for the reset button
    resetBtn.addEventListener("click", resetGame);

    // Initialize the game
    renderBoard();
    updateMessage();
});
