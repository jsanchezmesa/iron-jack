window.onload = function() {
  var canvas = document.getElementById("iron-jack");
  var game = new Game(canvas);

  var gameContainer = document.getElementById("game");
  var startContainer = document.getElementById("start");
  
  var startButton = document.getElementById("start-game");
  var resetButton = document.getElementById("reset-game");

  // if there is a started game, the button does nothing
  startButton.onclick = function() {

    startContainer.style.display = "none";
    gameContainer.style.display = "block";

    if( !game.started ) {
      game.start();
    }
  }

  resetButton.onclick = function() {
    game.reset();
  }
}