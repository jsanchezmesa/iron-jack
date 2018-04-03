window.onload = function() {
  var canvas = document.getElementById("iron-jack");
  var game = new Game(canvas);

  var startButton = document.getElementById("start-game");
  var pauseButton = document.getElementById("pause-game");
  var resetButton = document.getElementById("reset-game");

  // if there is a started game, the button does nothing
  startButton.onclick = function() {
    if( !game.started ) {
      game.start();
    }
  }

  resetButton.onclick = function() {
    game.reset();
  }

  /* pauseButton.onclick = function() {
    game.pause();
  }
  */

}