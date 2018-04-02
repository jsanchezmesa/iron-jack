function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.player = new Player(this);

  this.marginWidthPlatform = Math.floor(this.canvas.width * 0.2);
  this.marginHeightPlatform = Math.floor(this.canvas.height * 0.1);

  this.numPlatforms = 5;
  this.platformArray = [];

  this.generatePlatforms();
}

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.move();
      this.draw();
      this.platformCollision();
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
      for(var j = 0; j < this.platformArray.length; j++ ) {        
        if( platform.x + platform.width > this.platformArray[j].x && 
            this.platformArray[j].x + this.platformArray[j].width > platform.x ) {
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
      this.player.y <=
        this.platformArray[i].y /*+ this.platformArray[i].height*/ &&
      this.player.y + this.player.height >= this.platformArray[i].y
    ) {
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

Game.prototype.enemyCollision = function() {};

Game.prototype.itemCollision = function() {};
