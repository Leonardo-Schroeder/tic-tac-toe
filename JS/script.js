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

function getPlayerNames() {

    playerAName = prompt("Entre com o nome do Jogador X:", "");
    
    while (playerAName === null || playerAName.trim() === "") {
        playerAName = prompt("Entre com o nome do Jogador X:", "");
    }

    playerBName = "Jogador X: " + playerBName;

    playerBName = prompt("Entre com o nome do Jogador O:", "");

    while (playerBName === null || playerBName.trim() === "") {
        playerBName = prompt("Entre com o nome do Jogador O:", "");
    }

    document.getElementById("playerA").innerHTML = "Jogador A: " + playerAName;
    document.getElementById("playerB").innerHTML = "Jogador B: " + playerBName;
    
    winsA = 0;
    winsB = 0;

    document.getElementById("winsA").innerHTML = winsA;
    document.getElementById("winsB").innerHTML = winsB;

    //Começando o jogo
    initGame();
    document.getElementById("status").innerHTML = "Pronto para jogar!";

}

//AAAA
function initGame() {
    // Resetar variáveis do jogo
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Limpar tabuleiro visualmente
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o', 'winner');
    });
    
    // Atualizar status e vez do jogador
    updateGameStatus();
    addCellListeners();
}

// Função para adicionar listeners às células
function addCellListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        // Remover listener anterior e adicionar novo
        cell.replaceWith(cell.cloneNode(true));
    });
    
    // Adicionar listeners às novas células
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

// Função para lidar com clique na célula
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    // Verificar se a célula já foi clicada ou se o jogo não está ativo
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Fazer a jogada
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    
    // Verificar se há vencedor
    checkResult();
}

// Função para verificar resultado do jogo
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
    
    // Se houve vitória
    if (roundWon) {
        gameActive = false;
        highlightWinningCells(winningLine);
        
        // Atualizar placar
        if (currentPlayer === 'X') {
            winsA++;
            document.getElementById("winsA").innerHTML = winsA;
            document.getElementById("status").innerHTML = `🎉 ${playerAName} (X) venceu!`;
        } else {
            winsB++;
            document.getElementById("winsB").innerHTML = winsB;
            document.getElementById("status").innerHTML = `🎉 ${playerBName} (O) venceu!`;
        }
        return;
    }
    
    // Verificar empate
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameActive = false;
        document.getElementById("status").innerHTML = "Empate!";
        return;
    }
    
    // Continuar jogo - mudar jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
}

// Função para destacar células vencedoras
function highlightWinningCells(winningLine) {
    winningLine.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
    });
}

// Função para atualizar status do jogo
function updateGameStatus() {
    const turnElement = document.getElementById("play-turn");
    if (currentPlayer === 'X') {
        turnElement.textContent = playerAName + " (X)";
        turnElement.style.color = "#ff6b6b";
    } else {
        turnElement.textContent = playerBName + " (O)";
        turnElement.style.color = "#4ecdc4";
    }
    
    if (gameActive) {
        document.getElementById("status").innerHTML = "Jogo em andamento...";
    }
}

//AAA
function onClickReset(){
    initGame();
}

function onClickChangePlayers(){
    winsA = 0;
    winsB = 0;
    getPlayerNames();
}

// Pequeno 
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(getPlayerNames, 100);
});
