var winsA = 0, winsB = 0;

//Alterar função para não começar até ele digitar um nome 
// Alinhar nome e Player
// Arrumar pontuação
function getPlayerNames() {

    let playerA = prompt("Entre com o nome do Jogador A (X):", "Jogador X");
    
    // Se o nome for null (Cancelado) ou vazio, usa um nome padrão
    if (playerA === null || playerA.trim() === "") {
        playerA = "Jogador X";
    }

    // 2. Solicita o nome do Jogador B
    let playerB = prompt("Entre com o nome do Jogador B (O):", "Jogador O");

    // Se o nome for null (Cancelado) ou vazio, usa um nome padrão
    if (playerB === null || playerB.trim() === "") {
        playerB = "Jogador O";
    }


    document.getElementById("playerA").innerHTML = playerA;
    document.getElementById("playerB").innerHTML = playerB;
    
    winsA = 0;
    winsB = 0;

    document.getElementById("winsA").innerHTML = winsA;
    document.getElementById("winsB").innerHTML = winsB;
    document.getElementById("status").innerHTML = "Pronto para jogar!";
}

getPlayerNames();
