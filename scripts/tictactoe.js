console.log("Linked!");
//get names
$(document).ready(function(){

//var size = 3;
var size;
var player1;
var player2;
var gameOver = false;
$('#submit').click(function(e) {
  e.preventDefault();
  player1 = $('#player1-name').val();
  player2 = $('#player2-name').val();
  size = parseInt($('#size').val());
  makeBoard(size);
  $('.form-horizontal').hide("slow");
  clicking();
});

function makeBoard(size){
  //$('#newGame').hide('slow');
  $('#newGame').remove();
  var y;
  var x;
  var board = $("<div class='board'></div>");
  for (y=0; y<size; y++){
    for (x=0; x<size; x++){
      var cell = $('<div>&nbsp</div>');//that's a non-breaking space
      var cellId = size * y + x;
      cell.attr('class','box').attr('id',cellId);
      board.append(cell);
    }
  }
  $('.container').append(board);
  $('.container').css('width', 230*size + 'px');//works only up to size 24
  clicking();
};
//makeBoard(size);

function clicking(){
  console.log(gameOver);
  var playerX = true;
  var playerO = false;
  $('.box').click(function() {
    if (gameOver === false){
      //console.log($('#'+this.id).text());
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
    }
  })
}

function checkWinner() {
  var boxId;
  for (boxId=0; boxId<size*size; boxId++) {
    //if row wins
    if (boxId % size === 0) {
      var winningRowCounter = 0;
      for (var i = boxId; i<boxId+size; i++) {
        var startOfRow = $('#'+boxId);
        if (startOfRow.text() === $('#'+i).text() && !($('#'+i).text() === "String.fromCharCode(160)")) {
          winningRowCounter +=1;
          //console.log(winningRowCounter)
        }
      }
      if (winningRowCounter === size) {
        victory(startOfRow.text(), player1, player2);
      }
    }
    //if column wins
    if (boxId < size) {
      var winningColumnCounter = 0;
      for (var j = boxId; j<size*size; j+=size) {
        var startOfColumn = $('#'+boxId);
        if (startOfColumn.text() === $('#'+j).text() && !($('#'+j).text()==="String.fromCharCode(160)")) {
          winningColumnCounter +=1;
        }
      }
      if (winningColumnCounter === size) {
        victory(startOfColumn.text(), player1, player2);
      }
      //console.log(winningColumnCounter);
    }
    //if first diagnol wins
    if (boxId === 0) {
      var winningFirstDiagnolCounter = 0;
      for (var k=boxId; k<size*size; k+=(size+1)) {
        if ($('#0').text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
          winningFirstDiagnolCounter +=1;
        }
      }
      if (winningFirstDiagnolCounter === size) {
        victory($('#0').text(), player1, player2);
      }
    }
    //if second diagnol wins
    if (boxId === size-1) {
      var winningSecondDiagnolCounter = 0;
      for (var k=boxId; k<size*size; k+=(size-1)) {
        if ($('#'+(size-1)).text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
          winningSecondDiagnolCounter +=1;
        }
      }
      if (winningSecondDiagnolCounter === size) {
        victory($('#'+(size-1)).text(), player1, player2);
      }
    }    
  }
}

function victory(winningLetter, player1, player2) {
  //make modal message?
  if (winningLetter === "X") {
    //$('#myModal').modal();
    gameOver = true;
    $('#0').before("<button id='newGame'>New Game</button><br>");
    $('#newGame').click(function(){
      $('.box').remove();
      gameOver = false;
      makeBoard(size);
    })
  } else if (winningLetter === "O") {
    gameOver = true;
    $('#0').before("<button id='newGame'>New Game</button><br>");
    $('#newGame').click(function(){
      $('.box').remove();
      gameOver = false;
      makeBoard(size);
    });
  }
}
$("#myBtn").click(function(){
      $("#myModal").modal();
  });

//https://thebovinecomedy.files.wordpress.com/2009/07/wargames.jpg

})//end $(document).ready(function(){})

