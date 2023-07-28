let table = document.getElementById("container");
let result = document.getElementById("result");
let rows = 6
let columns = 7;
let yellowPlayer = 'Y';
let redPlayer = 'R';
let gameOver = false;
let board;
let currentRow;
let players = ['Y', 'R'];

function getRandomPlayer(array) {
  return array[Math.floor((Math.random()*array.length))];
}

let currentPlayer = getRandomPlayer(players);

function createGameTable() {
  board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = " ";

      let cell = document.createElement("div");
      cell.id = `${i}${j}`;
      cell.classList.add("cell");
      table.append(cell);
    }
    board.push(board[i]);
  }
}

function createCells() {

  const cells = document.querySelectorAll(".cell");
  currentRow = [5,5,5,5,5,5,5];
  for (let cell of cells) {
    cell.addEventListener("click", function() {

      let cellId = cell.id;
     // let cellRow = cellId[0];
      let cellColumn = cellId[1];

      let cellRow = currentRow[cellColumn];

      if(gameOver || board[cellRow][cellColumn] !== " " || cellRow < 0) {
        return;
      }

      if (cellRow >= 0) { 

        board[cellRow][cellColumn] = currentPlayer;
        cell = document.getElementById(`${cellRow}${cellColumn}`);
      if (currentPlayer === yellowPlayer) {
        cell.classList.add("yellowPlayer");
        currentPlayer = redPlayer;
      } else {
        cell.classList.add("redPlayer");
        currentPlayer = yellowPlayer;
      }

        cellRow -= 1;
        currentRow[cellColumn] = cellRow;

        checkWin();
      }
    });
  }
}

function checkWin() { 
  //check line
  for (let i = 0; i < rows; i++) {
    for(let j = 0; j < columns - 3; j++) {
      if (board[i][j] !== " ") {
        if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]) {
          setWinner(i, j);
          return;
        }
      }
    }
  }

  //check column
  for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows - 3; i++) {
      if (board[i][j]  !== " ") {
        if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]) {
          setWinner(i, j);
          return;
        }
      }
    }
  }

  //check diagonal on the left side
  for(let i = 0; i < rows - 3; i++) {
    for (let j = 0; j < columns - 3; j++) {
      if (board[i][j] !== " ") {
        if(board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]) {
          setWinner(i, j);
          return;
        }
      }
    }
  }

  //check diagonal on the right side
  for(let i = 3; i < rows; i++) {
    for (let j = 0; j < columns - 3; j++) {
      if (board[i][j] !== " ") {
        if (board[i][j] == board[i - 1][j + 1] && board[i - 1][j + 1] == board[i - 2][j + 2] && board[i - 2][j + 2] == board[i - 3][j + 3]) {
          setWinner(i, j);
          return;
        }
      }
    }
  }
}

function setWinner(row, column) { 
  if(board[row][column] == yellowPlayer) {
    result.innerHTML = "Yellow player won!";
  } else {
    result.innerHTML = "Red player won!";
  }
  gameOver = true;
}

function resetGame() {

  board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = " ";

      let cell = document.getElementById(`${i}${j}`);
      cell.classList.remove("yellowPlayer", "redPlayer");
    }
  }
  currentRow = [5, 5, 5, 5, 5, 5, 5];
  currentPlayer = getRandomPlayer(players);
  result.innerHTML = "";
  gameOver = false;
}

createGameTable();
createCells();

