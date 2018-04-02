window.onload = function() {
  var canvas = document.getElementById("iron-jack");
  var game = new Game(canvas);

  var startButton = document.getElementById("start-game");
  var pauseButton = document.getElementById("pause-game");
  var resetButton = document.getElementById("reset-game");

  startButton.onclick = function() {
    game.start();
  }

  /* pauseButton.onclick = function() {
    game.pause();
  }

  resetButton.onclick = function() {
    game.reset(); 
  }*/

}