document.addEventListener('DOMContentLoaded', startFirstGame)

//Define your `board` object here!
var board = {}
var size = 4;
//make a variable to hold the sound effect
var winnerSound = new Audio();
winnerSound.src = "sounds/You-win-sound-effect.mp3"
var magicChimeSound = new Audio();
magicChimeSound.src = "sounds/magic-chime-end-game.mp3";
var flag = new Audio();
flag.src = "sounds/pop-flag.mp3";

function startFirstGame(){
  generateBoard();
  wireEvents();
  lib.initBoard();
}

function restartGame() {
  clearBoard();
  generateBoard();
  wireEvents();
  lib.initBoard();
}

function generateBoard() {
  board = { 
    cells: []
  }
  getRangeInt();
  for(var i = 0; i < size; i++){
    for(var j = 0; j < size; j++){
      var isMine = false;
      if(Math.random() <= 1/3){
        isMine = true;
      }
      var cell = { row: i, col: j, isMine: isMine, hidden: true, isMarked: false}
      board.cells.push(cell);
    }
  }
}

/*/function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

function getRangeInt(min, max) {
  var n = min;
  while(min <= max) {
    return n++;
  } 
}
var size = getRangeInt(4,6);

function wireEvents() {  
  //loop through the contents of board.cells
  for (var i = 0; i < board.cells.length; i++) {
    //the loop needs to call countSurroundingMines once
    // for each cell in board.cells
    var cell = board.cells[i];
    //Assign the result of countSurroundingMines to a property on each cell object. 
    cell.surroundingMines = countSurroundingMines(cell);
    //document.addEventListener calls checkForWin every time the left mouse button is clicked
    document.addEventListener("click", checkForWin);
    //calls checkForWin when the right mouse button (contextmenu) is clicked
    document.addEventListener("contextmenu", checkForWin);
    //reset the board
    var reset = document.getElementById("reset");
    reset.addEventListener("click", restartGame);

    document.getElementById("replay").addEventListener("click", replayGame);

    document.getElementById("small").addEventListener("click", smallBoard);
    document.getElementById("medium").addEventListener("click", mediumBoard);
    document.getElementById("large").addEventListener("click", largeBoard);

  }
  // Don't remove this function call: it makes the game work!  
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //loop through the surrounding cells returned from getSurroundingCells
  //checking each one to see if it's a mine and adding to a count variable if it is.
  var countMines = 0;
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      countMines++;
    }
    //Once you have the correct count, return it.
  }
  return countMines;
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
  //it should loop through all of board.cells.
  for (i = 0; i < board.cells.length; i++) {
    var cell = board.cells[i];
    if (cell.isMine === true && cell.isMarked === false) {
      return;
    }
    if (cell.isMine === false && cell.hidden === true) {
      return;
    }
  }
  displayMessage("You Win!");
  winnerSound.play();
  removeListeners()
}

function replayGame(){
  clearBoard();
  resetCurrentBoard();
  lib.initBoard();
}

function clearBoard() {
  document.getElementsByClassName("board")[0].innerHTML = "";
}

function resetCurrentBoard(){
  board.cells.forEach(cell => {
    cell.hidden = true;
    cell.isMarked = false;
  });
  clearBoard();
}

function resetBoard() {
  if(size === 4) {
    smallBoard();
  } else if(size === 5) {
    mediumBoard();
  } else{
    largeBoard();
  }
}

function smallBoard() {
  clearBoard();
  size = 4;
  startFirstGame(size);
}

function mediumBoard() {
  clearBoard();
  size = 5;
  startFirstGame(size);
}

function largeBoard() {
  clearBoard();
  size = 6;
  startFirstGame(size);
}