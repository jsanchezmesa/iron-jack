function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.background = new Background(this);
  this.player = new Player(this);
  this.platforms = new Platform(this);
  this.enemies = new Enemy(this);
  
  this.numItems = 25;
  this.itemArray = [];
  this.generateItems();

  this.started = false;
}

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.finished();
      this.move();
      this.draw();
      this.platformCollision();
      this.enemyCollision();
      this.itemCollision();
    }.bind(this),
    1000 / 60
  );

  this.started = true;
};

Game.prototype.reset = function() {
  clearInterval(this.intervalId);
  this.intervalId = 0;
  this.player.reset();
  this.platforms.reset();

  if( this.itemArray.length == 0 ) {
    this.player.level++;
  }
  this.itemArray = [];
  this.generateItems();
  
  this.enemies.reset();
  this.clear();
  this.start();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();

  this.platforms.draw();

  this.itemArray.forEach( function(item) {
    item.draw();
  });

  this.enemies.draw();

  this.player.draw();  

  // update score
  var points = document.getElementById("points");
  points.innerText = "";
  points.innerText = "Points: " + this.player.points;

  // update level
  var level = document.getElementById("level");
  level.innerHTML = "";
  level.innerText = "Level: " + this.player.level;

};

Game.prototype.move = function() {
  this.player.move();
  this.enemies.move();
};

// detect collision between player and platforms
Game.prototype.platformCollision = function() {
  var collision = false;
  var platform;
  for (var i = 0; i < this.platforms.platformArray.length; i++) {
    if (
      this.player.x < this.platforms.platformArray[i].x + this.platforms.platformArray[i].width &&
      this.player.x + this.player.width > this.platforms.platformArray[i].x &&
      this.player.y <= this.platforms.platformArray[i].y &&
      this.player.y + this.player.height >= this.platforms.platformArray[i].y ) {
      collision = true;
      platform = this.platforms.platformArray[i];
    }
  }

  if (collision && this.player.dy >= 0) {
    this.player.isOnPlatform = true;
    this.player.isJumping = false;
    this.player.y = platform.y - this.player.height;    
  } else if (!this.player.isJumping && this.player.isOnPlatform) {
    // player falls on a platform side
    this.player.isJumping = true;
    this.player.isOnPlatform = false;
  }
};

// detect collision between item and platform
Game.prototype.itemPlatformCollision = function(item) {
  var collision = false;
  for( var i = 0; i < this.platforms.platformArray.length; i++ ) {
    var platform = this.platforms.platformArray[i];

    if( item.x - item.width < platform.x + platform.width &&
      item.x + item.width > platform.x &&
      item.y - item.height < platform.y + platform.height &&
      item.y + item.height > platform.y ) {
        collision = true;
    }
  }

  return collision;
}

// generate random items
Game.prototype.generateItems = function() {
  while ( this.itemArray.length < this.numItems ) {
    var collisionItem = false;
    var collisionPlatform = false;
    var item = new Item(this);

    if (this.itemArray.length == 0) {
      collisionPlatform = this.itemPlatformCollision(item);

      if( collisionPlatform ) {
        continue;
      } else {
        this.itemArray.push( item );
      }
    } else {
      // check collision with another items
      for(var i = 0; i < this.itemArray.length; i++ ) {    
        var itemPositioned = this.itemArray[i];    
        if( item.x < itemPositioned.x + itemPositioned.width &&
            item.x + item.width > itemPositioned.x &&
            item.y < itemPositioned.y + itemPositioned.height &&
            item.y + item.height > itemPositioned.y ) {
          collisionItem = true;
        }
      }

      // check collision with platforms
      collisionPlatform = this.itemPlatformCollision(item);

      if( !collisionItem && !collisionPlatform ) {
        this.itemArray.push( item );
      }
    }      
  };
}

// detect collision between player and item
Game.prototype.itemCollision = function() {
  this.itemArray.forEach( function(e, i) {
    if( e.collidesWith(this.player) ) {
      this.itemArray.splice( i, 1 );
      this.player.points += 2;
    }
  }.bind(this));
};

// detect collision between player and enemies
Game.prototype.enemyCollision = function() {
  if( this.enemies.collidesWith( this.player) ) {
    this.clear();
    this.finishMessage("GAME OVER");
    this.started = false;
    this.player.points = 0;
  }
};

// player gets all items
Game.prototype.finished = function() {
  if( this.itemArray.length == 0 ) {
    this.finishMessage("YOU WIN");
    
    setTimeout( function() {
      this.reset();
    }.bind(this), 2000);
  }
};

Game.prototype.finishMessage = function(message) {
  clearInterval(this.intervalId);
  this.intervalId = 0;

  this.ctx.fillStyle = "red";
  this.ctx.font = "40px sans-serif";
  this.ctx.textAlign = "center";
  this.ctx.fillText( message, this.canvas.width/2, this.canvas.height * 0.33, this.canvas.width );

  this.ctx.fillStyle = "white";
  this.ctx.fillText( this.player.points + " points", this.canvas.width/2, this.canvas.height * 0.66, this.canvas.width);
}