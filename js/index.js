window.onload = function() {
  var canvas = document.getElementById("iron-jack");
  var game = new Game(canvas);

  var startButton = document.getElementById("start-game");
  var stopButton = document.getElementById("stop-game");
  var resetButton = document.getElementById("reset-game");

  startButton.onclick = function() {
    game.start();
  }

  stopButton.onclick = function() {
    game.stop();
  }

  resetButton.onclick = function() {
    game.reset();
  }

}