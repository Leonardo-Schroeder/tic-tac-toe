var winsA = 0, winsB = 0;
var currentPlayer = 'X';
var gameActive = true;
var gameState = ['', '', '', '', '', '', '', '', ''];
var playerAName = '';
var playerBName = '';

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
    [0, 4, 8], [2, 4, 6]             // diagonais
];

function writePlayerNames() {
    document.getElementById("playerA").innerHTML = "Jogador A: " + playerAName;
    document.getElementById("playerB").innerHTML = "Jogador B: " + playerBName;
}

function zeroScores() {
    winsA = 0;
    winsB = 0;
    document.getElementById("winsA").innerHTML = winsA;
    document.getElementById("winsB").innerHTML = winsB;
}

function updateStatus(status) {
     document.getElementById("status").innerHTML = status;
}

function getPlayerNames() {
    do {
        playerAName = prompt("Entre com o nome do Jogador X:");
    } while (playerAName === null || playerAName.trim() === "");

    do { 
        playerBName = prompt("Entre com o nome do Jogador O:");
    } while (playerBName === null || playerBName.trim() === "");

    writePlayerNames();
    zeroScores();

    //Começando o jogo
    initGame();
    updateStatus("Pronto para jogar!");
}

function initGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Limpar tabuleiro visualmente
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o');
    });

    const oldLines = document.querySelectorAll('.win-line');
    oldLines.forEach(line => line.remove());

    // Atualizar status e vez do jogador
    updateTurn();
}

function onClickCell(index) {
    const clickedCell = document.querySelector(`.cell[data-index="${index}"]`);
    
    // Verificar se a célula já foi clicada ou se o jogo está inativo
    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    // Fazer a jogada
    gameState[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    // Verificar resultado
    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningLine = [];
    
    // Verificar combinações vencedoras
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }
    
    // Vitória
    if (roundWon) {
        gameActive = false;
        drawWinLine(winningLine);

        // Atualizar placar
        if (currentPlayer === 'X') {
            winsA++;
            document.getElementById("winsA").innerHTML = winsA;
            updateStatus(`🎉 ${playerAName} venceu!`);
        } else {
            winsB++;
            document.getElementById("winsB").innerHTML = winsB;
            updateStatus(`🎉 ${playerBName} venceu!`);
        }

        return;
    }
    
    // Empate
    if (!gameState.includes('')) {
        gameActive = false;
        updateStatus("🤝 Empate!");
        return;
    }
    
    // Continuar jogo - mudar jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurn();
}

function drawWinLine(winningLine) {
    const board = document.getElementById("board");
    const line = document.createElement("div");
    line.classList.add("win-line");

    // Casos possíveis:
    if (winningLine.toString() === "0,1,2") {
        line.style.top = "16%";
        line.style.left = "0";
        line.style.width = "100%";
    } else if (winningLine.toString() === "3,4,5") {
        line.style.top = "50%";
        line.style.left = "0";
        line.style.width = "100%";
    } else if (winningLine.toString() === "6,7,8") {
        line.style.top = "83%";
        line.style.left = "0";
        line.style.width = "100%";
    } else if (winningLine.toString() === "0,3,6") {
        line.style.top = "0";
        line.style.left = "16%";
        line.style.height = "100%";
        line.style.width = "5px";
    } else if (winningLine.toString() === "1,4,7") {
        line.style.top = "0";
        line.style.left = "50%";
        line.style.height = "100%";
        line.style.width = "5px";
    } else if (winningLine.toString() === "2,5,8") {
        line.style.top = "0";
        line.style.left = "83%";
        line.style.height = "100%";
        line.style.width = "5px";
    } else if (winningLine.toString() === "0,4,8") {
        line.style.top = "0";
        line.style.left = "0";
        line.style.width = "100%";
        line.style.transform = "rotate(45deg)";
        line.style.transformOrigin = "top left";
    } else if (winningLine.toString() === "2,4,6") {
        line.style.top = "0";
        line.style.right = "0";
        line.style.width = "100%";
        line.style.transform = "rotate(-45deg)";
        line.style.transformOrigin = "top right";
    }

    board.appendChild(line);
}

function updateTurn() {
    const turn = document.getElementById("play-turn");

    if (currentPlayer === 'X') {
        turn.textContent = playerAName + " (X)";
        turn.style.color = "#200283ff";
    } else {
        turn.textContent = playerBName + " (O)";
        turn.style.color = "#c91700ff";
    }
    
    if (gameActive) {
        updateStatus("Jogo em andamento...");
    }
}

function onClickReset(){
    initGame();
}

function onClickChangePlayers(){
    winsA = 0;
    winsB = 0;
    getPlayerNames();
}

// Pequeno delay
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(getPlayerNames, 150);
});
