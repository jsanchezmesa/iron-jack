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
  
  this.img = new Image();
  this.img.src = "./img/enemy.png";

  if( this.dx > 0 ) {
    this.frameIndex = 0;
  } else {
    this.frameIndex = 1;
  }

  this.frameWidth = 60;

  this.numEnemies = 3;
  this.enemiesArray = [];
  this.generateEnemies();
}

// generate random enemies
Enemy.prototype.generateEnemies = function() {
  while ( this.enemiesArray.length < this.numEnemies ) {
    this.generateEnemy();
    var collision = false;
    var enemy = {};
    enemy.game = this.game;
    enemy.x = this.x;
    enemy.y = this.y;
    enemy.width = this.width;
    enemy.height = this.height;
    enemy.dx = this.dx;
    enemy.dy = this.dy;
    enemy.frameIndex = this.frameIndex;
    enemy.frameWidth = this.frameWidth;
    enemy.img = this.img;
    enemy.__proto__ = this.__proto__;

    if (this.enemiesArray.length == 0) {
      this.enemiesArray.push( enemy );
    } else {
      // check collision with another enemies
      this.enemiesArray.forEach( function(e) {
        if( enemy.x < e.x + e.width &&
          enemy.x + enemy.width > e.x &&
          enemy.y < e.y + e.height &&
          enemy.y + enemy.height > e.y ) {
            collision = true;
        }
      })

      if( !collision ) {
        this.enemiesArray.push( enemy );
      }
    }      
  };
}

// generate random position
Enemy.prototype.generateEnemy = function() {
  this.x = this.generateRandom(0, this.maxX );
  this.y = this.generateRandom(0, this.maxY );
}

Enemy.prototype.draw = function() {
  this.enemiesArray.forEach( function(e) {
    e.game.ctx.drawImage(e.img, e.frameIndex * e.frameWidth, 0, e.frameWidth, e.img.height, e.x, e.y, e.width, e.height);
  });
}

Enemy.prototype.collidesWith = function(player){
  var collision = false;  
  this.enemiesArray.forEach( function(e) {
    if( player.x <= e.x + e.width &&
      player.x + player.width >= e.x &&
      player.y <= e.y + e.height &&
      player.y + player.height >= e.y ) {
        collision = true;
      }
  });
  
  return collision;
}

Enemy.prototype.move = function() {
  this.enemiesArray.forEach( function(e) {
    // move in x
    e.x += e.dx;

    // check limits in x
    if (e.x + e.width > e.game.canvas.width) {
      e.x = e.game.canvas.width - e.width;
      e.dx *= -1;
      e.changeFrame();
    } else if (e.x < 0) {
      e.x = 0;
      e.dx *= -1;
      e.changeFrame();
    }

    // move in y
    e.y += e.dy;

    // check limits in y (bottom)
    if (e.y + e.height > e.game.canvas.height) {
      e.y = e.game.canvas.height - e.height;
      e.dy *= -1;
    } else if( e.y < 0 ) {
      e.y = 0;
      e.dy *= -1;
    }
  });  
}

// update enemy image
Enemy.prototype.changeFrame = function() {
  if( this.frameIndex == 0 ) {
    this.frameIndex = 1;
  } else {
    this.frameIndex = 0;
  }
}

// update number of enemies
Enemy.prototype.updateEnemies = function() {
  if( this.game.player.level == 1 ) {
    this.numEnemies = 3;
  } else if( this.game.player.level == 2 ) {
    this.numEnemies = 4;
  } else {
    this.numEnemies = 5;
  }
}

Enemy.prototype.reset = function() {  
  this.updateEnemies();
  this.enemiesArray = [];
  this.generateEnemies();
}

Enemy.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}