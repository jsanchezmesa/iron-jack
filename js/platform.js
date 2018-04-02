function Platform(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  // it avoids a line
  this.maxWidth = Math.floor(this.game.canvas.width / 3);
  this.minWidth = 30;
  this.height = 10;    
  
  this.color = "grey";
  
  this.generateWidthPlatform();
}

// generate random position and width
Platform.prototype.generateWidthPlatform = function() {
  
  this.width = this.generateRandom( this.minWidth, this.maxWidth);
  
  // it sets minimum and maximum X,Y to generate random values

  this.minY = this.game.canvas.height * 0.2;
  this.maxY = this.game.canvas.height - /* this.height - */ this.game.player.height * 2;
  this.maxX = this.game.canvas.width - this.width;

  this.x = this.generateRandom( 1, this.maxX);
  this.y = this.generateRandom( this.minY, this.maxY);
}

Platform.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}

Platform.prototype.draw = function() {
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
}