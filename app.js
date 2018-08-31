// INTIALIZING MESSAGES
console.log('app.js file has been loaded. Ready!');
////////////////////////////////////////////////////////////////////////////////

// STORAGE
var board = [null, null, null, null, null, null, null, null, null];
var marks = {x: '❌', o: '⭕️'};
var userMark = marks.x; // initially start out as player X
var moveCount = 0;
var gameCanContinue = true;
var ties = 0;
var usersStats = {x: {wins: 0, losses: 0}, o: {wins: 0, losses: 0}};
var placeholders = ['🤣','💪','😍','🤓','😡','😭','😂','😊','🐳','😸','👻','💻'];
var slotPlaceholder = '🤣';
////////////////////////////////////////////////////////////////////////////////

// FUNCTIONS
var intializeboard = function() {
    for (var i = 0; i < 9; i++) {

        document.getElementById('slot' + i).addEventListener('click', (e) => {
            
            if (gameCanContinue && !board[getSlotIndex(e)]) {
                console.log(`${e.target.id}: ${e.target.innerText} --> ${userMark}`);

                var currPlayer = userMark;
                moveCount++;
                console.log('total moves count: ', moveCount);

                toggleSlotValue(e);
                togglePlayer();

                if (detectWin(currPlayer)) {
                    setWin(currPlayer);
                }
                
                if (moveCount === 9 && gameCanContinue) {
                    declareTie();
                }
            }
        }, false);
    }
}

var initializeResetButton = function() {
    document.getElementById('reset-button').addEventListener('click', () => {
        console.log("Restarting round... game board will now reset.");
        resetBoard();
    }, false);
}

var detectWin = function(userMark) {
    // if the board meets any of the 8 recognized wins, then declare a winner
    crosses = [];
    legalCrosses = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for (var i = 0; i < legalCrosses.length; i++) {
        if (legalCrosses[i] !== `${slotPlaceholder}`) {
            crosses.push(
                board[legalCrosses[i][0]] === userMark &&
                board[legalCrosses[i][1]] === userMark &&
                board[legalCrosses[i][2]] === userMark
            );
        }
    }

    return crosses.includes(true);
}

var resetBoard = function() {
    for (var i = 0; i < 9; i++) {
        var slotId = 'slot' + i;
        document.getElementById(slotId).innerText = `${slotPlaceholder}`;
    }

    board = [null, null, null, null, null, null, null, null, null];
    userMark = marks.x; // initially start out as player X
    moveCount = 0;
    setGameCanContinue(true);
    setNewSlotPlaceholder();
    document.getElementById('win-message').innerText = '';
    // setNextPlayer(marks.x);
}

var declareTie = function() {
    ties++;
    setGameCanContinue(false);
    document.getElementById('win-message').innerText = `Sorry, this round is a tie!`;
    document.getElementById('ties').innerText = `${ties}`;
}

var updateBoardStorage = function(userMark, i) {
    board[i] = userMark;
    console.log('BOARD STORAGE: ', board);
}

////////////////////////////////////////////////////////////////////////////////

// GETTERS AND SETTERS

var setGameCanContinue = function(bool) {
    gameCanContinue = bool;
}

var setNextPlayer = function(userMark) {
    document.getElementById('curr-player').innerText = userMark;
}

var setWin = function(userMark) {
    if (userMark === marks.x) {
        usersStats.x.wins++;
        usersStats.o.losses++;
    } else {
        usersStats.o.wins++;
        usersStats.x.losses++;
    }
    
    setGameCanContinue(false);
    document.getElementById('win-message').innerText = `Congrats, Player ${userMark}. You won!`;
    document.getElementById('player-x').innerText = `👍 ${usersStats.x.wins} , 👎 ${usersStats.x.losses}`;
    document.getElementById('player-o').innerText = `👍 ${usersStats.o.wins} , 👎 ${usersStats.o.losses}`;
}

var setNewSlotPlaceholder = function() {
    slotPlaceholder = placeholders[(Math.floor(Math.random() * placeholders.length))];
}

var getSlotIndex = function(e) {
    return parseInt(e.target.id.slice(4));
}

////////////////////////////////////////////////////////////////////////////////

// HELPER FUNCTIONS
var togglePlayer = function() {
    (userMark === marks.x) ? userMark = marks.o : userMark = marks.x;
    toggleNextPlayerMessage();
}

var toggleSlotValue = function(e) {
    e.target.innerText = userMark;
    updateBoardStorage(userMark, parseInt(e.target.id.slice(4)));
}

var toggleNextPlayerMessage = function() {
    document.getElementById('curr-player').innerText = userMark;
}
////////////////////////////////////////////////////////////////////////////////

// MAIN PROGRAM
intializeboard();
initializeResetButton();
////////////////////////////////////////////////////////////////////////////////