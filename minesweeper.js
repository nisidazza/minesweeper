document.addEventListener('DOMContentLoaded', startGame)

//Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 0, col: 1, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 0, col: 2, isMine: true, hidden: true, surroundingMines: 2 },
    { row: 1, col: 0, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 1, col: 1, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 1, col: 2, isMine: true, hidden: true, surroundingMines: 2 },
    { row: 2, col: 0, isMine: true, hidden: true, surroundingMines: 3 },
    { row: 2, col: 1, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 2, col: 2, isMine: false, hidden: true, surroundingMines: 1 },
  ]
}




function startGame() {
  //loop through the contents of board.cells
  for (var i = 0; i < board.cells.length; i++) {
    //the loop needs to call countSurroundingMines once
    // for each cell in board.cells
    var cell = board.cells[i];
    //Assign the result of countSurroundingMines to a property on each cell object. 
    cell.surroundingMines = countSurroundingMines(cell);
    //document.addEventListener calls checkForWin every time the left mouse button is clicked
    document.addEventListener("click", checkForWin);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
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
  for (i = 0; i<surrounding.length; i ++){
    if(surrounding[i].isMine === true) {
      countMines ++;
      console.log(i);
    }
  //Once you have the correct count, return it.
  }
  return countMines;
}

