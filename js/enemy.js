function Enemy(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.width = 50;
  this.height = 50;

  // select a random speed
  var speeds = [1, 2, -1, -2];  
  this.dx = speeds[ Math.floor( Math.random() * speeds.length) ];
  this.dy = speeds[ Math.floor( Math.random() * speeds.length) ];

  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height / 2; 
  
  this.generateEnemy();

  //this.color = "black";
  this.img = new Image();
  this.img.src = "./img/enemy.png";

  if( this.dx > 0 ) {
    this.frameIndex = 0;
  } else {
    this.frameIndex = 1;
  }

  this.frameWidth = 60;
}

// generate random position
Enemy.prototype.generateEnemy = function() {
  this.x = this.generateRandom(0, this.maxX );
  this.y = this.generateRandom(0, this.maxY );
}

Enemy.prototype.draw = function() {
  //this.game.ctx.fillStyle = this.color;
  //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.game.ctx.drawImage(this.img, this.frameIndex * this.frameWidth, 0, this.frameWidth, this.img.height, this.x, this.y, this.width, this.height);
}

Enemy.prototype.collidesWith = function(player){
  if( player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y ) {
        return true;
      }
  return false;
}

Enemy.prototype.move = function() {
  // move in x
  this.x += this.dx;

  // check limits in x
  if (this.x + this.width > this.game.canvas.width) {
    this.x = this.game.canvas.width - this.width;
    this.dx *= -1;
    this.changeFrame();
  } else if (this.x < 0) {
    this.x = 0;
    this.dx *= -1;
    this.changeFrame();
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

Enemy.prototype.changeFrame = function() {
  if( this.frameIndex == 0 ) {
    this.frameIndex = 1;
  } else {
    this.frameIndex = 0;
  }
}

Enemy.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}