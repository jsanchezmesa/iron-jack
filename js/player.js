function Player(game) {
  this.game = game;

  this.width = 50;
  this.height = 50;

  this.originX = this.game.canvas.width / 2 - this.width / 2; // position on start
  this.originY = this.game.canvas.height - this.height; // positon on start
  this.x = this.originX;
  this.y = this.originY;

  this.speed = 5; // speed to move in x or y
  this.dx = 0; // distance to move in x
  this.dy = 0; // distance to move in y
  this.brakeX = 0.97; // brake x,0 movement
  this.isJumping = false;
  this.isOnPlatform = false;

  this.gravity = 0.25;

  //this.color = "red";
  this.img = new Image();
  this.img.src = "./img/player.png";
  this.frameIndex = 0;
  this.frameWidth = 60;

  this.points = 0;

  this.level = 1;

  this.setListeners();
}

Player.prototype.draw = function() {
  /* this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height); */
  this.game.ctx.drawImage(this.img, this.frameIndex * this.frameWidth, 0, this.frameWidth, this.img.height, this.x, this.y, this.width, this.height);
};

Player.prototype.move = function() {
  // if player is not jumping (on a surface), it brakes when it moves to left or right
  if (!this.isJumping ) {
    this.dx *= this.brakeX;
  } 
  this.x += this.dx; // increment movement in x

  // apply gravity when falling
  this.dy += this.gravity;

  // if player is jumping, it falls
  if (this.isJumping || !this.isOnPlatform) {
    this.y += this.dy;
  }

  // reset dy when it's in a platform
  if( !this.isJumping && this.isOnPlatform && this.dy > 5 ) {
    this.dy = 0;
  }

  // check limits in x
  if (this.x + this.width > this.game.canvas.width) {
    this.x = this.game.canvas.width - this.width;
  } else if (this.x < 0) {
    this.x = 0;
  }

  // check limits in y (bottom)
  if (this.y + this.height > this.game.canvas.height) {
    this.y = this.game.canvas.height - this.height;
    this.isJumping = false;
  }
};

Player.prototype.setListeners = function() {
  /*  
      37 => Left Arrow
      38 => Up Arrow
      39 => Right Arrow
      40 => Down Arrow
  */
  var map = {
    37: false, 
    38: false, 
    39: false, 
    40: false
  };
  
  document.onkeydown = function(event) {   
    
    map[event.keyCode] = true;

    if( map[40] && map[38] ) {
      // Down & Up
      if( this.isOnPlatform ) {
        this.isJumping = true;
        this.dy = this.gravity * 100;
        this.y += this.dy;
      }
      if( this.dx > 0 ) {
        this.frameIndex = 1;
      } else {
        this.frameIndex = 3;
      }
    } else if( map[37] && map[38] ) {
      // Left & Up
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2.2;
        if (this.dx > -this.speed) {
          this.dx -= 1;
        }
      }
      this.frameIndex = 3;
    } else if( map[39] && map[38] ) {
      // Right & Up
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2.2;
        if (this.dx < this.speed) {
          this.dx += 1;
        }
      }
      this.frameIndex = 1;
    } else if( map[37] ) {
      // Left
      if (this.dx > -this.speed) {
        this.dx -= 1;
      }
      this.frameIndex = 2;
    } else if( map[39] ) {
      // Right
      if (this.dx < this.speed) {
        this.dx += 1;
      }
      this.frameIndex = 0;
    } else if( map[38] ) {
      // Up
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2.2;
      }

      if( this.dx > 0 ) {
        this.frameIndex = 1;
      } else {
        this.frameIndex = 3;
      } 
    }
  }.bind(this);

  document.onkeyup = function(event) {
    map[event.keyCode] = false;
  }
};

// reset to original position
Player.prototype.reset = function() {
  this.x = this.originX;
  this.y = this.originY;
  this.dx = 0;
  this.dy = 0;
};
