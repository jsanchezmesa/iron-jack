function Enemy(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.img = new Image();
  this.img.src = "https://vignette.wikia.nocookie.net/villiains/images/7/75/Articuno_Pokemon_Fire_Red_Sprite_Front.PNG/revision/latest?cb=20140602174032";

  this.width = 50;
  this.height = 50;

  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height - this.height;

  this.generateEnemy();
}

Enemy.prototype.generateEnemy = function() {
  this.x = this.generateRandom(0, this.maxX );
  this.y = this.generateRandom(0, this.maxY );
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Enemy.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}