let board = null;
let game = null;

function showStudentOptions() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('game-options').style.display = 'block';
}

function startChessLevel(level) {
    document.getElementById('game-options').style.display = 'none';
    document.getElementById('chessboard-container').style.display = 'block';
    startNewGame();
}

function startNewGame() {
    game = new Chess();
    board = Chessboard('chessboard', {
        draggable: true,
        position: 'start',
        onDrop: handleMove
    });
}

function playScenario() {
    const scenarioPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    game = new Chess(scenarioPosition);
    board = Chessboard('chessboard', {
        draggable: true,
        position: scenarioPosition,
        onDrop: handleMove
    });
}

function playAgainstAI() {
    game = new Chess();
    board = Chessboard('chessboard', {
        draggable: true,
        position: 'start',
        onDrop: handleMove
    });
    playAI();
}

function handleMove(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    window.setTimeout(playAI, 250);
}

function playAI() {
    if (game.game_over()) {
        alert('Game Over');
        return;
    }

    let moves = game.moves();
    let move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move);
    board.position(game.fen());
}

function endGame() {
    document.getElementById('chessboard-container').style.display = 'none';
    document.getElementById('game-options').style.display = 'block';
    if (board) {
        board.destroy();
    }
}
