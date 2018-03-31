function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  
  this.player = new Player(this);
  
  
}

Game.prototype.start = function() {

  this.intervalId = setInterval( function() {
    this.clear();
    this.move();
    this.draw();
  }.bind(this), 1000 / 60);

}

Game.prototype.pause = function() {
  clearInterval(this.intervalId);
}

Game.prototype.finished = function() {

}

Game.prototype.reset = function() {
  this.pause();
  this.intervalId = 0;
  this.player.reset();
  this.clear();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.player.draw();
}

Game.prototype.move = function() {
  this.player.move();
}

Game.prototype.generatePlatform = function() {

}

Game.prototype.platformCollision = function() {

}

Game.prototype.enemyCollision = function() {

}