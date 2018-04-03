function Enemy(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.width = 50;
  this.height = 50;

  // select a random speed
  var speeds = [2, 3, 4, -2, -3, -4];  
  this.dx = speeds[ Math.floor( Math.random() * speeds.length) ];
  this.dy = speeds[ Math.floor( Math.random() * speeds.length) ];

  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height / 2; 

  this.color = "black";

  this.generateEnemy();
}

// generate random position
Enemy.prototype.generateEnemy = function() {
  this.x = this.generateRandom(0, this.maxX );
  this.y = this.generateRandom(0, this.maxY );
}

Enemy.prototype.draw = function() {
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Enemy.prototype.move = function() {
  // move in x
  this.x += this.dx;

  // check limits in x
  if (this.x + this.width > this.game.canvas.width) {
    this.x = this.game.canvas.width - this.width;
    this.dx *= -1;
  } else if (this.x < 0) {
    this.x = 0;
    this.dx *= -1;
  }

  // move in y
  this.y += this.dy;

  // check limits in y (bottom)
  if (this.y + this.height > this.game.canvas.height) {
    this.y = this.game.canvas.height - this.height;
    this.dy *= -1;
  } else if( this.y < 0 ) {
    this.y = 0;
    this.dy *= -1;
  }

}

Enemy.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}