function Enemy(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.img = new Image();
  this.img.src = "https://vignette.wikia.nocookie.net/villiains/images/7/75/Articuno_Pokemon_Fire_Red_Sprite_Front.PNG/revision/latest?cb=20140602174032";

  this.width = 50;
  this.height = 50;

  // select a random speed
  var speeds = [3, 4, 5, -3, -4, -5];
  this.speed = speeds[ Math.floor( Math.random() * speeds.length) ];
  
  this.dx = speeds[ Math.floor( Math.random() * speeds.length) ];
  this.dy = speeds[ Math.floor( Math.random() * speeds.length) ];

  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height / 2; 

  this.generateEnemy();
}

Enemy.prototype.generateEnemy = function() {
  this.x = this.generateRandom(0, this.maxX );
  this.y = this.generateRandom(0, this.maxY );
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Enemy.prototype.move = function() {
  this.x += this.dx;

  // check limits in x
  if (this.x + this.width > this.game.canvas.width) {
    this.x = this.game.canvas.width - this.width;
    this.dx *= -1;
  } else if (this.x < 0) {
    this.x = 0;
    this.dx *= -1;
  }

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