function Platform(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.maxWidth = this.game.canvas.width / 3;
  // it avoids a line
  this.minWidth = 30;
  this.height = 30;  

  this.color = "yellow";

  this.generateWidthPlatform();
}


Platform.prototype.generateWidthPlatform = function() {
  this.width = Math.floor( Math.random() * this.maxWidth + this.minWidth);
  this.x = Math.floor( Math.random() * (this.x + this.game.canvas.width - this.width) );
  this.y = Math.floor( Math.random() * (this.y + this.game.canvas.height - this.height) );
}

Platform.prototype.draw = function() {

  this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
}