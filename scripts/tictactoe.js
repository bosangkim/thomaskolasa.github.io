console.log("Linked!");
//get names
$(document).ready(function(){

function getInput(){  
  console.log($('button'));
  console.log($('#submit'));
  $('button').click(function() {
    console.log("clicked");
    debugger
    //var player1 = $('#player1-name').val();
    //console.log(player1);
  });
}
getInput();

//get dimensions
var dimension = 3;
//get picture

function makeBoard(){
  var y;
  var x;
  var board = $("<div class='board'></div>");
  for (y=0; y<dimension; y++){
    for (x=0; x<dimension; x++){
      var cell = $('<div>&nbsp</div>');//that's a non-breaking space
      var cellId = dimension * y + x;
      cell.attr('class','box').attr('id',cellId);
      board.append(cell);
    }
  }
  $('.container').append(board);
  $('.container').css('width', 230*dimension + 'px');//works only up to size 24
};
makeBoard();


function clicking(){
  var playerX = true;
  var playerO = false;
  $('.box').click(function() {
    console.log($('#'+this.id).text());
    //&nbsp is CharCode 160
    if ($('#'+this.id).text() == String.fromCharCode(160)){ 
      if (playerX) {
        playerX = false;
        playerO = true;
        $('#'+this.id).text("X");
      } else if (playerO) {
        playerX = true;
        playerO = false;
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
        if (startOfRow.text() === $('#'+i).text() && !($('#'+i).text() === "String.fromCharCode(160)")) {
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
        if (startOfColumn.text() === $('#'+j).text() && !($('#'+j).text()==="String.fromCharCode(160)")) {
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
        if ($('#0').text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
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
        if ($('#'+(dimension-1)).text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
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
  var winner = thePlayer;
  //modal message
  if (winner === "X") {
    console.log("victory for " + thePlayer);
    $("#myModal").toggle();
  } else if (winner === "O") {
    console.log("victory for " + thePlayer);
  }
}







//https://thebovinecomedy.files.wordpress.com/2009/07/wargames.jpg
//make a carousel?




})//end $(document).ready(function(){})


