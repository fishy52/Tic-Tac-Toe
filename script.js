let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let player1_turn = true;
let player1_name = "Player1";
let player2_name = "Player2";
let player1_color;
let player2_color;
let player1_score = 0;
let player2_score = 0;

function StartGame() {
    player1_name = document.getElementById("player1Name").value;
    player2_name = document.getElementById("player2Name").value;
    player1_color = document.getElementById("player1Color").value;
    player2_color = document.getElementById("player2Color").value;
    document.getElementById("pregame").remove();

    document.getElementById("playerNames").innerHTML = `
    <p id="player1" class="player">` + player1_name + `</p>
    <p id="player2" class="player">` + player2_name + `</p>
    `;

    document.getElementById("playerScores").innerHTML = `
    <p id="player1Score" class="playerScore">` + player1_score + `</p>
    <p id="player2Score" class="playerScore">` + player2_score + `</p>
    `;

    document.getElementById("main").innerHTML = `
    <div onclick="ClickElement(this, 0, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 0, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 0, 2)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 2)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 2)" class="boardElement"></div>
    `;

    document.getElementById("player1").style = 'background-color: ' + player1_color + ';';
    document.getElementById("player2").style = 'background-color: transparent;';
}

function ClickElement(elem, x, y) {
    if (board[x][y] == 0) {
        if (player1_turn == true) {
            elem.style = "background-color: " + player1_color + ";"
            board[x][y] = 1;
            ChangePlayer();
            document.getElementById("player1").style = 'background-color: transparent;';
            document.getElementById("player2").style = 'background-color: ' + player2_color + ';';
        } else {
            elem.style = "background-color: " + player2_color + ";"
            board[x][y] = 10;
            ChangePlayer();
            document.getElementById("player1").style = 'background-color: ' + player1_color + ';';
            document.getElementById("player2").style = 'background-color: transparent;';
        }

        checkWinner();
    }

}

function checkWinner() {
    let hasWinner = false;
    //check y
    for (let i = 0; i < 3; i++) {
        let count = 0;
        for (let j = 0; j < 3; j++) {
            count += board[i][j];
            if (count == 3) {
                hasWinner = true;
                P1Win();
            } else if (count == 30) {
                hasWinner = true;
                P2Win();
            }
        }
    }
    //check x
    for (let i = 0; i < 3; i++) {
        let count = 0;
        for (let j = 0; j < 3; j++) {
            count += board[j][i];
            if (count == 3) {
                hasWinner = true;
                P1Win();
            } else if (count == 30) {
                hasWinner = true;
                P2Win();
            }
        }
    }
    //diagonal
    if (board[0][0] + board[1][1] + board[2][2] == 3) {
        hasWinner = true;
        P1Win();
    } else if (board[0][0] + board[1][1] + board[2][2] == 30) {
        hasWinner = true;
        P2Win();
    }
    if (board[0][2] + board[1][1] + board[2][0] == 3) {
        hasWinner = true;
        P1Win();
    } else if (board[0][2] + board[1][1] + board[2][0] == 30) {
        hasWinner = true;
        P2Win();
    }

    //check for draw
    if (hasWinner == false) {
        let hasEmpty = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    hasEmpty = true;
                }
            }
        }

        if (hasEmpty == false) {
            Draw();
        }
    }
}

function ChangePlayer() {
    player1_turn = !player1_turn;
}

function P1Win() {
    player1_score++;
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").style = "width: 0px; height: 0px;"
    //document.getElementById("playerNames").innerHTML = "";
    document.getElementById("player1").style = 'background-color: ' + player1_color + ';';
    document.getElementById("player2").style = 'background-color: transparent;';
    document.getElementById("player1Score").innerHTML = player1_score;
    document.getElementById("player2Score").innerHTML = player2_score;
    document.getElementById("winText").innerHTML = '<h1>' + player1_name + ' has won!</h1>';
    document.getElementById("winText").innerHTML += `
        <div class="play">
        <div class="center"><h1 id="winButton" onclick="newGame()" class="expandButton">Play Again</h1></div>
        </div>
    `;
}

function P2Win() {
    player2_score++;
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").style = "width: 0px; height: 0px;"
    //document.getElementById("playerNames").innerHTML = "";
    document.getElementById("player1").style = 'background-color: transparent;';
    document.getElementById("player2").style = 'background-color: ' + player2_color + ';';
    document.getElementById("player1Score").innerHTML = player1_score;
    document.getElementById("player2Score").innerHTML = player2_score;
    document.getElementById("winText").innerHTML = '<h1>' + player2_name + ' has won!</h1>';
    document.getElementById("winText").innerHTML += `
        <div class="play">
        <div class="center"><h1 id="winButton" onclick="newGame()" class="expandButton">Play Again</h1></div>
        </div>
    `;
}

function Draw() {
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").style = "width: 0px; height: 0px;"
    //document.getElementById("playerNames").innerHTML = "";
    document.getElementById("player1").style = 'background-color: transparent;';
    document.getElementById("player2").style = 'background-color: transparent;';
    document.getElementById("player1Score").innerHTML = player1_score;
    document.getElementById("player2Score").innerHTML = player2_score;
    document.getElementById("winText").innerHTML = '<h1>Draw!</h1>';
    document.getElementById("winText").innerHTML += `
        <div class="play">
        <div class="center"><h1 id="winButton" onclick="newGame()" class="expandButton">Play Again</h1></div>
        </div>
    `;
}

function newGame() {

    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    document.getElementById("winText").innerHTML = "";

    document.getElementById("playerNames").innerHTML = `
    <p id="player1" class="player">` + player1_name + `</p>
    <p id="player2" class="player">` + player2_name + `</p>
    `;

    document.getElementById("playerScores").innerHTML = `
    <p id="player1Score" class="playerScore">` + player1_score + `</p>
    <p id="player2Score" class="playerScore">` + player2_score + `</p>
    `;

    document.getElementById("main").innerHTML = `
    <div onclick="ClickElement(this, 0, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 0)" class="boardElement"></div>
    <div onclick="ClickElement(this, 0, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 1)" class="boardElement"></div>
    <div onclick="ClickElement(this, 0, 2)" class="boardElement"></div>
    <div onclick="ClickElement(this, 1, 2)" class="boardElement"></div>
    <div onclick="ClickElement(this, 2, 2)" class="boardElement"></div>
    `;

    document.getElementById("main").style = "";

    if (player1_turn) {
        document.getElementById("player1").style = 'background-color: ' + player1_color + ';';
        document.getElementById("player2").style = 'background-color: transparent;';
    } else {
        document.getElementById("player1").style = 'background-color: transparent;';
        document.getElementById("player2").style = 'background-color: ' + player2_color + ';';
    }

}