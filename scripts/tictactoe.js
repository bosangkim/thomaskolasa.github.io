/*
0 1 2
3 4 5
6 7 8

1  2  3  4
5  6  7  8 
9  10 11 12
13 14 15 16

0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15

0  1  2  3  4
5  6  7  8  9
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24
*/
console.log("Linked!");
//get names

//get dimensions
var dimension = 3;

function makeBoard(){
  var y;
  var x;
  var board = $("<div class='board'></div>");
  for (y=0; y<dimension; y++){
    for (x=0; x<dimension; x++){
      var cell = $('<div>box</div>');
      var cellId = dimension * y + x;
      cell.attr('class','box').attr('id',cellId);
      //<div class="col-xs-4"></div> for thirds
      board.append(cell);
    }
  }
  $('body').append(board);
  //make it display rows with css
};
makeBoard();


function clicking(){
  var player1 = true;
  var player2 = false;
  $('.box').click(function() {
    if ($('#'+this.id).text() === "box"){
      if (player1) {
        player1 = false;
        player2 = true;
        $('#'+this.id).text("X");
      } else if (player2) {
        player1 = true;
        player2 = false;
        $('#'+this.id).text("O");
      }
      checkWinner();
    }
  })
}
clicking();

function checkWinner() {
  var boxId;
  for (boxId=0; boxId<dimension*dimension; boxId++) {
    //if row wins
    if (boxId % dimension === 0) {
      var winningRowCounter = 0;
      
      for (var i = boxId; i<boxId+dimension; i++) {
        var startOfRow = $('#'+boxId);
        if (startOfRow.text() === $('#'+i).text() && !($('#'+i).text() === "box")) {
          winningRowCounter +=1;
        }
      }
      if (winningRowCounter === dimension) {
        victory(startOfRow.text());
      }
      //console.log(winningRowCounter);
    }
    //if column wins
    if (boxId < dimension) {
      var winningColumnCounter = 0;
      for (var j = boxId; j<dimension*dimension; j+=dimension) {
        var startOfColumn = $('#'+boxId);
        if (startOfColumn.text() === $('#'+j).text() && !($('#'+j).text()==="box")) {
          winningColumnCounter +=1;
        }
      }
      if (winningColumnCounter === dimension) {
        victory(startOfColumn.text());
      }
      //console.log(winningColumnCounter);
    }
    //first diagnol
    if (boxId === 0) {
      var winningFirstDiagnolCounter = 0;
      for (var k=boxId; k<dimension*dimension; k+=(dimension+1)) {
        if ($('#0').text() === $('#'+k).text() && !($('#'+k).text()==="box")) {
          winningFirstDiagnolCounter +=1;
        }
      }
      if (winningFirstDiagnolCounter === dimension) {
        victory($('#0').text());
      }
    }
    //second diagnol
    if (boxId === dimension-1) {
      var winningSecondDiagnolCounter = 0;
      for (var k=boxId; k<dimension*dimension; k+=(dimension-1)) {
        if ($('#'+(dimension-1)).text() === $('#'+k).text() && !($('#'+k).text()==="box")) {
          winningSecondDiagnolCounter +=1;
        }
      }
      if (winningSecondDiagnolCounter === dimension) {
        victory($('#'+(dimension-1)).text());
      }
    }    
  }
}

function victory(thePlayer) {
  console.log("victory for " + thePlayer);
  //modal message

}
















