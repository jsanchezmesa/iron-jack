function Item(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.width = 20;
  this.height = this.width;
  
  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height - this.height;

  //this.color = "blue";
  this.img = new Image();
  this.img.src = "./img/item.png";

  this.generateItem();
}

// generate random position
Item.prototype.generateItem = function() {
  this.x = this.generateRandom( 0 + this.width, this.maxX );
  this.y = this.generateRandom( 0 + this.width, this.maxY );
}

Item.prototype.draw = function() {
  /* this.game.ctx.fillStyle = this.color;
  this.game.ctx.beginPath();
  this.game.ctx.arc( this.x, this.y, this.width / 2, 0, Math.PI*2 );
  this.game.ctx.fill();
  this.game.ctx.closePath(); */
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Item.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}

Item.prototype.collidesWith = function(player){
  if( player.x <= this.x + this.width/2 &&
      player.x + player.width >= this.x - this.width/2 &&
      player.y <= this.y + this.height/2 &&
      player.y + player.height >= this.y - this.height/2 ) {
      
      return true;
  }
  return false;
}