function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.background = new Background(this);
  this.player = new Player(this);

  this.marginWidthPlatform = Math.floor(this.canvas.width * 0.2);
  this.marginHeightPlatform = Math.floor(this.canvas.height * 0.1);

  this.numPlatforms = 5;
  this.platformArray = [];
  this.generatePlatforms();

  this.numItems = 25;
  this.itemArray = [];
  this.generateItems();

  this.numEnemies = 0;
  this.enemiesArray = [];
  this.generateEnemies();

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
  this.platformArray = [];
  this.generatePlatforms();

  if( this.itemArray.length == 0 ) {
    this.player.level++;
  }
  this.itemArray = [];
  this.generateItems();
  
  this.updateEnemies();
  this.enemiesArray = [];
  this.generateEnemies();
  this.clear();
  this.start();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();

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

  this.enemiesArray.forEach( function(enemy) {
    enemy.move();
  });
};

// generate random platforms
Game.prototype.generatePlatforms = function() {
  
  while ( this.platformArray.length < this.numPlatforms ) {
    var collision = false;
    var platform = new Platform(this);

    if (this.platformArray.length == 0) {
      // adjust Y position
      var maxY = this.canvas.height * 0.9;
      var minY = this.canvas.height / 2;
      platform.y = Math.floor( (Math.random() * (maxY - minY + 1)) + minY);
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

// detect collision between player and platforms
Game.prototype.platformCollision = function() {
  var collision = false;
  var platform;
  for (var i = 0; i < this.platformArray.length; i++) {
    if (
      this.player.x < this.platformArray[i].x + this.platformArray[i].width &&
      this.player.x + this.player.width > this.platformArray[i].x &&
      this.player.y <= this.platformArray[i].y &&
      this.player.y + this.player.height >= this.platformArray[i].y ) {
      collision = true;
      platform = this.platformArray[i];
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
  for( var i = 0; i < this.platformArray.length; i++ ) {
    var platform = this.platformArray[i];

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

// update number of enemies
Game.prototype.updateEnemies = function() {
  if( this.player.level == 1 ) {
    this.numEnemies = 3;
  } else if( this.player.level == 2 ) {
    this.numEnemies = 4;
  } else {
    this.numEnemies = 5;
  }
}

// generate random enemies
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

// detect collision between player and enemies
Game.prototype.enemyCollision = function() {
  this.enemiesArray.forEach( function(e) {
    if( e.collidesWith(this.player) ) {
      this.clear();
      this.finishMessage("GAME OVER");
      this.started = false;
      this.player.points = 0;
    }
  }.bind(this));
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