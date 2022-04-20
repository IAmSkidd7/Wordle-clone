//number of guesses
var height = 6;
//length of word
var width = 5; 
//current guess
var row = 0; 
//current letter
var column = 0;

var gameOver = false;
var word = "SQUID"

window.onload = function () {
  initialize()

}
// create game board
function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile")
      tile.innerText = "";
      document.getElementById("board").appendChild(tile)
    }
  }
  // listens for keyup event
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (column < width) {
        let currentTile = document.getElementById(row.toString() + "-" + column.toString());
        if (currentTile.innerText == "") {
          currentTile.innerText = e.code[3];
          column += 1;
        }
      }
    }
    else if (e.code == "Backspace") {
      if (0 < column && column <= width) {
        column -= 1;
      }
      let currentTile = document.getElementById(row.toString() + "-" + column.toString());
      currentTile.innerText = "";
    }
    else if (e.code == "Enter") {
      update();
      //start new row
      row += 1;
      //starts at 0 for new row
      col = 0;
    }
    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  })
}

function update() {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currentTile.innerText;

    // is letter in correct position?
    if (word[c] == letter) {
      currentTile.classList.add("correct");
      correct += 1;
    }
    // is the letter in the word?
    else if (word.includes(letter)) {
      currentTile.classList.add("present");
    }
    // not in the word
    else {
      currentTile.classList.add("absent")
    }
    if (correct == width) {
      gameOver = true;
    }
  }
}