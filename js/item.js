function Item(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.width = 20;
  this.height = this.width;
  
  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height - this.height;

  this.color = "blue";

  this.generateItem();
}

// generate random position
Item.prototype.generateItem = function() {
  this.x = this.generateRandom( 0 + this.width, this.maxX );
  this.y = this.generateRandom( 0 + this.width, this.maxY );
}

Item.prototype.draw = function() {
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.beginPath();
  this.game.ctx.arc( this.x, this.y, this.width / 2, 0, Math.PI*2 );
  this.game.ctx.fill();
  this.game.ctx.closePath();
}

Item.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}