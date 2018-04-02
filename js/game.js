function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.player = new Player(this);

  this.marginWidthPlatform = Math.floor(this.canvas.width * 0.2);
  this.marginHeightPlatform = Math.floor(this.canvas.height * 0.1);

  this.numPlatforms = 5;
  this.platformArray = [];
  this.generatePlatforms();

  this.numItems = 20;
  this.itemArray = [];
  this.generateItems();

  this.numEnemies = 3;
  this.enemiesArray = [];
  this.generateEnemies();
}

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.move();
      this.draw();
      this.platformCollision();
      this.itemCollision();
    }.bind(this),
    1000 / 60
  );
};

Game.prototype.pause = function() {
  clearInterval(this.intervalId);
};

Game.prototype.finished = function() {};

Game.prototype.reset = function() {
  this.pause();
  this.intervalId = 0;
  this.player.reset();
  this.platformArray = [];
  this.generatePlatforms();
  this.clear();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.platformArray.forEach(function(platform) {
    platform.draw();
  });

  this.itemArray.forEach( function(item) {
    item.draw();
  });

  this.enemiesArray.forEach( function(enemy) {
    enemy.draw();
  });  

  this.player.draw();  

};

Game.prototype.move = function() {
  this.player.move();
};

Game.prototype.generatePlatforms = function() {
  
  while ( this.platformArray.length < this.numPlatforms ) {
    var collision = false;
    var platform = new Platform(this);

    if (this.platformArray.length == 0) {
      this.platformArray.push(platform);
    } else {
      for(var i = 0; i < this.platformArray.length; i++ ) {        
        if( platform.x + platform.width > this.platformArray[i].x && 
            this.platformArray[i].x + this.platformArray[i].width > platform.x ) {
          collision = true;
        }
      }

      if( !collision ) {
        this.platformArray.push( platform );
      }
    }      
  };
}

Game.prototype.platformCollision = function() {
  var collision = false;
  var platform;
  for (var i = 0; i < this.platformArray.length; i++) {
    if (
      this.player.x < this.platformArray[i].x + this.platformArray[i].width &&
      this.player.x + this.player.width > this.platformArray[i].x &&
      this.player.y <= this.platformArray[i].y /*+ this.platformArray[i].height*/ &&
      this.player.y + this.player.height >= this.platformArray[i].y ) {
      collision = true;
      platform = this.platformArray[i];
    }
  }

  if (collision) {
    this.player.isOnPlatform = true;
    this.player.isJumping = false;
    this.player.y = platform.y - this.player.height;
  } else if (!this.player.isJumping && this.player.isOnPlatform) {
    this.player.isJumping = true;
    this.player.isOnPlatform = false;
  }
};

Game.prototype.generateItems = function() {
  while ( this.itemArray.length < this.numItems ) {
    var collisionItem = false;
    var collisionPlatform = false;
    var item = new Item(this);

    if (this.itemArray.length == 0) {
      this.itemArray.push( item );
    } else {
      // check collision with another items
      for(var i = 0; i < this.itemArray.length; i++ ) {        
        if( item.x + item.width > this.itemArray[i].x && 
            this.itemArray[i].x + this.itemArray[i].width > item.x ) {
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

Game.prototype.itemPlatformCollision = function(item) {
  for( var i = 0; i < this.platformArray.length; i++ ) {
    var platform = this.platformArray[i];

    if( item.x < platform.x + platform.width &&
      item.x + item.width > platform.x &&
      item.y < platform.y + platform.height &&
      item.y + item.height > platform.y ) {
        return true;
      }
  }

  return false;
}

Game.prototype.itemCollision = function() {
  for( var i = 0; i < this.itemArray.length; i++) {
    if( this.player.x < this.itemArray[i].x + this.itemArray[i].width &&
      this.player.x + this.player.width > this.itemArray[i].x &&
      this.player.y <= this.itemArray[i].y + this.itemArray[i].height &&
      this.player.y + this.player.height >= this.itemArray[i].y ) {
        this.itemArray.splice(i, 1);
    }
  }
};

Game.prototype.generateEnemies = function() {
  while ( this.enemiesArray.length < this.numEnemies ) {
    var collision = false;
    var enemy = new Enemy(this);

    if (this.enemiesArray.length == 0) {
      this.enemiesArray.push( enemy );
    } else {
      // check collision with another enemies
      for(var i = 0; i < this.enemiesArray.length; i++ ) {        
        if( enemy.x < this.enemiesArray[i].x + this.enemiesArray[i].width &&
          enemy.x + enemy.width > this.enemiesArray[i].x &&
          enemy.y < this.enemiesArray[i].y + this.enemiesArray[i].height &&
          enemy.y + enemy.height > this.enemiesArray[i].y ) {
            collision = true;
        }
      }

      if( !collision ) {
        this.enemiesArray.push( enemy );
      }
    }      
  };
}

Game.prototype.enemyCollision = function() {};
