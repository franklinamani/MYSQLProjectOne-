/**
 * Written by: Olu Olabimtan
 * Tested/Edited by: Dr. Andrew Tappenden
 */

document.addEventListener("DOMContentLoaded", ready);

// Size of the Crossword board: 15 x 15
var size = 15;

// Total number of words in database
var wordTotal = 76;

// Position of all blacked out cells
var boardArray = [6,11,21,26,52,53,61,62,63,64,70,80,81,86,87,88,89,90,99,127,
  136,137,138,139,140,145,146,156,162,163,164,165,173,174,200,215,205,220];

// Position of all cells that start a word, across/down
var posArray = [1,2,3,4,5,7,8,9,10,12,13,14,15,16,22,27,31,36,41,46,54,65,67,
68,71,76,77,78,79,82,85,91,95,96,100,101,102,103,104,105,106,114,
121,128,141,142,147,151,152,153,154,155,157,160,161,166,171,175,
177,178,179,180,181,188,189,196,201,206,211,216,221];


//Board table display
var board;

//Word Array contains all the words retrieved from the database after entering queries
var wordArray = [];

//Num Array contains the word index of all the words in the database
var numArray = [];

//Bool Array (number/0) contains the index of only the words that are in the word array
var boolArray = [];

//Sub array of bool array for only across words
var acrossArray = [];

var setArray = [];

/**
 * Creates the board with blacked out squares and word indices
 */
function generateBoard() {
  board.innerHTML = "";

  var boardIndices = 1;
  var wordIndices = 1;

  //Creates each row
  for (var i = 0; i < size; i++) {
    row = board.insertRow(i);

    //Creates 15 cells for each row
    for (var j = 0; j < size; j++) {
      cell = row.insertCell(j);
      cell.className = "square";
      cell.style.borderStyle = "solid";
      cell.style.borderColor = "black";
      cell.style.borderWidth = "1px";
      cell.style.fontSize = "10";
      cell.style.textAlign = "center";

      //If boardIndices is in the boardArray, then blackout the cell
      if (boardArray.includes(boardIndices)) {
        cell.style.backgroundColor = "black";
      } else {
        cell.style.backgroundColor = "white";
      }

      //If boardIndices is in the posArray, the put the current wordIndices value in that cell's wordIndex
      if (posArray.includes(boardIndices)) {
        var wordIndex = document.createAttribute("wordIndex");
        wordIndex.value = "" + wordIndices;
        cell.setAttributeNode(wordIndex);
        wordIndices++;
      }
      //Else set the the wordIndex to 0
      else {
        var wordIndex = document.createAttribute("wordIndex");
        wordIndex.value = "0";
        cell.setAttributeNode(wordIndex);
      }

      boardIndices++;
    }
  }
  //Add the numbers on the cells with div elements
  addNumbers();
}

/**
 * Adds the number values to each cell as it should appear on the crossword
 */
function addNumbers() {

  //Gets all the cells in the grid
  var cells = document.getElementsByClassName("square");

  for (var i = 0; i < cells.length; i++) {
    //SEts the id of each cell to its wordIndex
    document.getElementsByClassName("square")[i].id = cells[i].getAttribute(
      "wordIndex"
    );
    //Create div element
    var div = document.createElement("div");
    div.style.width = "10px";
    div.style.height = "16px";
    div.style.fontSize = "10";
    div.style.margin = "auto";

    //Add wordIndex to the div element if the cell should have a number > 0 
    if (cells[i].getAttribute("wordIndex") !== "0") {
      div.innerHTML = cells[i].getAttribute("wordIndex");
      div.style.color = "#999999"
    }

    //Append the div element to the cells
    document.getElementsByClassName("square")[i].append(div);
  }

}

//Adds values to the 3 arrays used for the words
function generateAnswers() {
  wordArray = [];
  numArray = [];
  boolArray = [];

  words = document.getElementsByClassName("word");
  numbers = document.getElementsByClassName("index");

  for (var i = 0; i < wordTotal; i++) {
    wordVal = words[i].innerHTML.toUpperCase();
    wordArray.push(wordVal);

    numVal = numbers[i].innerHTML;
    if (numVal != "Across" && numVal != "Down") {
      numArray.push(numVal);
    }

    if (wordArray[i] !== "") {
      boolArray.push(numArray[i]);
    } else {
      boolArray.push(0);
    }

    setArray.push(0);

  }
  //Puts across words in separate array
  acrossArray = boolArray.slice(0, 31);

  //Adds the entered words across, and then down
  addAcross();
  addDown();
}


//Adds words ACROSS
function addAcross() {

  //Loops through all possible wordsin the database
  for (var i = 0; i < wordTotal; i++) {

    //If the boolArray has a non-zero value less than 31, 
    //then it is a word across
    if (boolArray[i] != 0 && i < 31) {

      //Loop through all the cells
      //by row and then cell
      for (var j = 0; j < size; j++) {
        for (var k = 0; k < size; k++) {

          //If one of the cells has the same wordIndex as the entry in boolArray,
          // then its is the correct position in the grid
          if (
            board.rows[j].cells[k].getAttribute("wordIndex") == boolArray[i]
          ) {
            //Loop through the length of the word
            for (var l = 0; l < wordArray[i].length; l++) {

              //If the word isn't longer than the board size
              if ((k + l) < 15) {

                //If the cell has has the character in its string then don't replace it
                if (
                  board.rows[j].cells[k + l].innerHTML.length > 1 &&
                  board.rows[j].cells[k + l].innerHTML.includes(
                    wordArray[i].charAt(l)
                  )
                ) {
                  board.rows[j].cells[k + l].innerHTML =
                    board.rows[j].cells[k + l].innerHTML;
                }
                //Else, replace it
                else {
                  board.rows[j].cells[k + l].innerHTML +=
                    "" + wordArray[i].charAt(l);
                }

                board.rows[j].cells[k + l].style.fontSize = "18";

              }

              //If the word is longer than the board, indicate by coloring the last cell orange
              if ((k + wordArray[i].length - 1) > (size - 1)) {
                board.rows[j].cells[size - 1].style.backgroundColor = "orange";
                board.rows[j].cells[size - 1].style.color = "white";
              }

            }

            //If the word is within the board's size,
            //check if it is short or long
            if ((k + wordArray[i].length) < size) {
              checkIfShort(j, k, "across");
              checkIfLong(j, k, wordArray[i].length, "across");
            }
            //Always check for cells with multiple letters
            checkIfMultiple(j, k, "across");
          }
        }
      }
    }
  }
}

//Adds words DOWN
function addDown() {

  //Loops through all possible wordsin the database
  for (var i = 0; i < wordTotal; i++) {

    //If the boolArray has a non-zero value greater than 31, 
    //then it is a word down
    if (boolArray[i] != 0 && i >= 31) {

      //Loop through all the cells
      //by row and then cell
      for (var j = 0; j < size; j++) {
        for (var k = 0; k < size; k++) {

          //If one of the cells has the same wordIndex as the entry in boolArray,
          // then its is the correct position in the grid
          if (
            board.rows[j].cells[k].getAttribute("wordIndex") == boolArray[i]
          ) {

            //Loop through the length of the word
            for (var l = 0; l < wordArray[i].length; l++) {

              //If the word isn't longer than the board
              if ((j + l) < 15) {
                //If the cell has has the character in its string then don't replace it
                if (
                  board.rows[j + l].cells[k].innerHTML.length > 1 &&
                  board.rows[j + l].cells[k].innerHTML.includes(
                    wordArray[i].charAt(l)
                  )
                ) {
                  board.rows[j + l].cells[k].innerHTML =
                    board.rows[j + l].cells[k].innerHTML;
                }
                //Else, replace it
                else {
                  board.rows[j + l].cells[k].innerHTML +=
                    "" + wordArray[i].charAt(l);
                }

                board.rows[j + l].cells[k].style.fontSize = "18";

                
                //If the word is longer than the board, indicate by coloring the last cell orange
                if ((j + wordArray[i].length - 1) > (size - 1)) {
                  board.rows[size - 1].cells[k].style.backgroundColor = "orange";
                  board.rows[size - 1].cells[k].style.color = "white";
                }
                
                //Always check if the acroos word is in place
                checkAcross(j, k, wordArray[i].length);
              }

            }

            //If the word is within the board's size,
            //check if it is short or long
            if ((j + wordArray[i].length) < size) {
              checkIfShort(j, k, "down");
              checkIfLong(j, k, wordArray[i].length, "down");
            }
            //Always check for cells with multiple letters
            checkIfMultiple(j, k, "down");
          }
        }
      }
    }
  }
}

/**
 * Checks if the across word from the down word has been entered
 * @param {*} row 
 * @param {*} cell 
 * @param {*} length 
 */
function checkAcross(row, cell, length) {
  //Loops through the length of the word to be coloured
  var i = 0;
  while ((row + i) < size && board.rows[row + i].cells[cell].style.backgroundColor != "black") 
  {
    //If any cell in the word has a wordIndex in the across array (where all the across wordIndices are), 
    //color it green
    if (acrossArray.includes(board.rows[row + i].cells[cell].getAttribute("wordIndex"))) {
      if (board.rows[row + i].cells[cell].style.backgroundColor == "white") {
        board.rows[row + i].cells[cell].style.backgroundColor = "green";
        board.rows[row + i].cells[cell].style.color = "white";
        break;
      }
    }

    //Loop backwards along the row where the cell is,
    else {
      for (var j = cell; j >= 0; j--) {

        //If any cell along this row has a wordIndex in the across array
        //color it green (if it is white)
        if (acrossArray.includes(board.rows[row + i].cells[j].getAttribute("wordIndex"))) {
          if (board.rows[row + i].cells[cell].style.backgroundColor == "white") {
            board.rows[row + i].cells[cell].style.backgroundColor = "green";
            board.rows[row + i].cells[cell].style.color = "white";
            break;
          }
        }
        //If any cell is colored black, stop the loop
        else if (board.rows[row + i].cells[j].style.backgroundColor == "black") {
          break;
        }
      }
    }
    i++;
  }
}

/**
 * Check if entered word is too long
 * @param {*} row row index of the first cell 
 * @param {*} cell cell index of the first cell
 * @param {*} length number of cells to check (length of word)
 * @param {*} position Across/Down
 */
function checkIfLong(row, cell, length, position) {

  //Loops through the length of the word to be checked
  for (var i = 0; i < length; i++) {

    //Checks if any of the cells along the length (across/down) has a backgound colour of black,
    //If so colour it red since it has crossed the black boundary (make font red if cell is black)
    if (position == "across") {
      if (board.rows[row].cells[cell + i].style.backgroundColor == "black") {

        for (var j = i; j < length; j++) {
          if (board.rows[row].cells[cell + j].style.backgroundColor == "white") {
            board.rows[row].cells[cell + j].style.backgroundColor = "red";
            board.rows[row].cells[cell + j].style.color = "white";
          }
          else if (board.rows[row].cells[cell + j].style.backgroundColor == "black") {
            board.rows[row].cells[cell + j].style.color = "red";
          }

        }
      }
    } 
    //DO THE SAME FOR DOWN WORDS
    else {
      if (board.rows[row + i].cells[cell].style.backgroundColor == "black") {

        for (var j = i; j < length; j++) {
          if (board.rows[row + j].cells[cell].style.backgroundColor == "white") {
            board.rows[row + j].cells[cell].style.backgroundColor = "red";
            board.rows[row + j].cells[cell].style.color = "white";
          }
          else if (board.rows[row + j].cells[cell].style.backgroundColor == "black") {
            board.rows[row + j].cells[cell].style.color = "red";
          }
        }
      }
    }
  }

}

/**
 Check if entered word is too short
 * @param {*} row row index of the first cell 
 * @param {*} cell cell index of the first cell
 * @param {*} position Across/Down
 */
function checkIfShort(row, cell, position) {

  //A loop that runs until it reaches the first black cell.
  //If any white cells are empty in this loop, colour them red

  if (position == "across") {
    var i = 0;
    //A loop that runs until it reaches the first black cell or the end of the board.
    //If any white cells are empty in this loop, colour them red
    while (board.rows[row].cells[cell + i].style.backgroundColor != "black") {
      if (cellEmpty(row, cell + i)) {
        board.rows[row].cells[cell + i].style.backgroundColor = "red";
        board.rows[row].cells[cell + i].style.color = "white";
      }
      i++;

      if ((cell + i) >= size) {
        break;
      }
    }

  }

  //DO THE SAME FOR DOWN
  else {
    console.log("HERE");
    var i = 0;
    console.log(board.rows[row].cells[cell].style.backgroundColor);
    while (board.rows[row + i].cells[cell].style.backgroundColor != "black") {
      console.log("HERE 2");
      if (cellEmpty(row + i, cell)) {
        board.rows[row + i].cells[cell].style.backgroundColor = "red";
        board.rows[row + i].cells[cell].style.color = "white";
      }
      i++;

      if ((row + i) >= size) {
        break;
      }
    }
  }
}

/**
 Check if entered word is has a cell with multiple characters
 * @param {*} row row index of the first cell 
 * @param {*} cell cell index of the first cell
 * @param {*} length number of cells to check (length of word)
 * @param {*} position Across/Down
 */
function checkIfMultiple(row, cell, position) {

  
  if (position == "across") {

    var i = 0;
    while ((cell + i) < size) {

      var j;
      var cellLength = board.rows[row].cells[cell + i].innerHTML.length;

      //Loop through the text in the cell, until there is a closing HTML tag ">" that is followed by a letter
      //If there is stop the loop 
      for (j = 0; j < cellLength; j++) {
        if (
          board.rows[row].cells[cell + i].innerHTML.charAt(j) === ">" &&
          board.rows[row].cells[cell + i].innerHTML.charAt(j + 1) >= "A" &&
          board.rows[row].cells[cell + i].innerHTML.charAt(j + 1) <= "Z"
        ) {
          break;
        }
      }

      //Create a substring from the index of the prev loop to the end of the cell string
      //Check if that substring is greater than 1 and colour the cell red if it is
      if (
        board.rows[row].cells[cell + i].innerHTML.substring(j + 1, cellLength)
          .length > 1 && (board.rows[row].cells[cell + i].style.backgroundColor == "white" || board.rows[row].cells[cell + i].style.backgroundColor == "green")
      ) {
        board.rows[row].cells[cell + i].style.backgroundColor = "red";
        board.rows[row].cells[cell + i].style.color = "white";
      }
      else if(board.rows[row].cells[cell + i].style.backgroundColor == "black")
      {
        board.rows[row].cells[cell + i].style.color = "red"
      }
      i++;
    }
  }


  //DO THE SAME FOR DOWN
  else {
    var i = 0;
    while ((row + i) < size) {
      var j;
      var cellLength = board.rows[row + i].cells[cell].innerHTML.length;
      for (j = 0; j < cellLength; j++) {
        if (
          board.rows[row + i].cells[cell].innerHTML.charAt(j) === ">" &&
          board.rows[row + i].cells[cell].innerHTML.charAt(j + 1) >= "A" &&
          board.rows[row + i].cells[cell].innerHTML.charAt(j + 1) <= "Z"
        ) {
          break;
        }
      }

      if (
        board.rows[row + i].cells[cell].innerHTML.substring(j + 1, cellLength)
          .length > 1 && (board.rows[row + i].cells[cell].style.backgroundColor == "white" || board.rows[row + i].cells[cell].style.backgroundColor == "green")
      ) {
        board.rows[row + i].cells[cell].style.backgroundColor = "red";
        board.rows[row + i].cells[cell].style.color = "white";
      }
      else if(board.rows[row + i].cells[cell].style.backgroundColor == "black")
      {
        board.rows[row + i].cells[cell].style.color = "red"
      }
      i++;
    }
  }
}

/**
 * Returns whether a cell in the board is empty or not
 * @param {*} row row index of the cell
 * @param {*} cell cell index of the cell
 */
function cellEmpty(row, cell) {
  //Length of the string in the cell
  var cellLength = board.rows[row].cells[cell].innerHTML.length;

  //Loop through the text in the cell, until there is a closing HTML tag ">" 
  //If the ">" is the last character then the cell is empty 
  for (var j = 0; j < cellLength; j++) {
    if (board.rows[row].cells[cell].innerHTML.charAt(cellLength - 1) === ">") {
      return true;
    }
  }

  return false;
}

/**
 * Function to colour queries the appropriate colour on the table
 */
function colourQueries() {
  //An array contianing all queries successful/failure
  var queries = document.querySelectorAll('.success,.failure')
  
  // Loop through all queries
  for(var i = 0; i < wordTotal; i++)
  {
    // If the setArray value is 1, then word is set, so colour green
    if(setArray[i] == 1)
    {
      queries[i].style.backgroundColor = "#32a852";
      queries[i].style.color = "white";
    }
    // If the setArray value is -1, then word is NOT set, so colour red
    else if(setArray[i] == -1)
    {
      queries[i].style.backgroundColor = "#ff6666";
      queries[i].style.color = "white";
    }
  }
}

/**
 * Function to place the right values in the setArray
 */
function fillSetArray()
{
  //Loop through Across words
  for(var i = 0; i < 31; i++)
  {
    //If the word has been entered as input
    if(boolArray[i] != 0)
    {
      //Loop through all cells
      for(var j = 0; j < size; j++)
      {
        for(var k = 0; k < size; k++)
        {
          //If cell's wordIndex is the same as the boolArray value
          if(board.rows[j].cells[k].getAttribute("wordIndex") == boolArray[i])
          {
            //Boolean to keep track of set value
            var set = true; 

            // Loop through the length of the word entered
            for (var l = 0; l < wordArray[i].length; l++) 
            {
              //If the word is still within the board's size
              if((k + l) < size)
              {
                //Check if any cell is NOT green
                if(board.rows[j].cells[k + l].style.backgroundColor != "green")
                {
                  set = false;
                  //If the cell is black, change set value to -1, since it is too long
                  if(board.rows[j].cells[k + l].style.backgroundColor == "black")
                  {
                    setArray[i] = -1;
                    break;
                  }
                 
                  //If the cell is red, change set value to -1, since there is a error
                  else if(board.rows[j].cells[k + l].style.backgroundColor == "red" || board.rows[j].cells[k + l].style.backgroundColor == "orange")
                  {
                    setArray[i] = -1;
                    break;
                  }
                  
                }
              }
              //If the word is longer than the board, change set value to -1, since there is a error
              else{
                set = false;
                setArray[i] = -1;
              }
            }

            //Check if the word is short than it should be 
            if(k + wordArray[i].length < size)
            {
              //If set boolean is true & the next cell after the word length is red, change set value to -1, since there is a error
              if(set && board.rows[j].cells[k + wordArray[i].length].style.backgroundColor == "red")
              {
                set = false;
                setArray[i] = -1;
              }
              //If set boolen is false & the next cell after the word length is red, change set value to -1, since there is a error
              else if(!set && board.rows[j].cells[k + wordArray[i].length].style.backgroundColor == "red")
              {
                
                set = false;
                setArray[i] = -1;
              }
              //If set boolen is true & the next cell after the word length is white, change set value to -1, since there is a error
              else if(set && board.rows[j].cells[k + wordArray[i].length].style.backgroundColor == "white")
              {
                
                set = false;
                setArray[i] = -1;
              }
            }

            //If the word is longer than the board, change set value to -1, since there is a error
            if(k + wordArray[i].length > size)
            {
              
              set = false;
              setArray[i] = -1;
            }
            
            //If set boolean is still true, change set value to 1, since the word has been set
            if(set)
            {
              setArray[i] = 1;
            }
          }
        }
      }
    }
  }


  //DO THE SAME FOR DOWN
  for(var i = 31; i < wordTotal; i++)
  {
    if(boolArray[i] != 0)
    {
      for(var j = 0; j < size; j++)
      {
        for(var k = 0; k < size; k++)
        {
          if(board.rows[j].cells[k].getAttribute("wordIndex") == boolArray[i])
          {
            var set = true;

            for (var l = 0; l < wordArray[i].length; l++) 
            {
              if((j + l) < size)
              {
                if(board.rows[j + l].cells[k].style.backgroundColor != "green")
                {
                  set = false;
                 //If the cell is black, change set value to -1, since it is too long
                 if(board.rows[j + l].cells[k].style.backgroundColor == "black")
                 {
                   setArray[i] = -1;
                   break;
                 }
                  else if(board.rows[j + l].cells[k].style.backgroundColor == "red" || board.rows[j + l].cells[k].style.backgroundColor == "orange")
                  {
                    setArray[i] = -1;
                  }
                }
              }

              else
              {
                set = false;
                setArray[i] = -1;
                break;
              }
              
            }

            if(j + wordArray[i].length < size)
            {
              if(set && board.rows[j + wordArray[i].length].cells[k].style.backgroundColor == "red")
              {
                set = false;
                setArray[i] = -1;
              }
              else if(!set && board.rows[j + wordArray[i].length].cells[k].style.backgroundColor == "red")
              {
                set = false;
                setArray[i] = -1;
              }
              else if(set && board.rows[j + wordArray[i].length].cells[k].style.backgroundColor == "white")
              {
                set = false;
                setArray[i] = -1;
              }
            }

            if(j + wordArray[i].length > size)
            {
              set = false;
              setArray[i] = -1;
            }

            if(set)
            {
              setArray[i] = 1;
            }
          }
        }
      }
    }
  }
  
}


//---------------------------------//
//   INITIAL LOAD                  //
//---------------------------------//
function ready() {
  board = document.getElementById("board");
  generateBoard();
  generateAnswers();
  fillSetArray();
  colourQueries();
}
