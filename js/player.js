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
  this.brakeX = 0.99; // brake x,0 movement
  this.isJumping = false;
  this.isOnPlatform = false;

  this.gravity = 0.25;

  this.color = "red";

  this.points = 0;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
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
      65 => A key
      68 => D key
      74 => J key
      83 => S key
  */
  var map = {
    65: false, 
    68: false, 
    74: false, 
    83: false
  };
  
  document.onkeydown = function(event) {   
    
    map[event.keyCode] = true;

    if( map[83] && map[74] ) {
      // S & J
      if( this.isOnPlatform ) {
        this.isJumping = true;
        this.dy = this.gravity * 100;
        this.y += this.dy;
      }
    } else if( map[65] && map[74] ) {
      // A & J
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2;
        if (this.dx > -this.speed) {
          this.dx -= 2;
        }
      }
    } else if( map[68] && map[74] ) {
      // D & J
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2;
        if (this.dx < this.speed) {
          this.dx += 2;
        }
      }
    } else if( map[65] ) {
      // A
      if (this.dx > -this.speed) {
        this.dx -= 2;
      }
    } else if( map[68] ) {
      // D
      if (this.dx < this.speed) {
        this.dx += 2;
      }
    } else if( map[74] ) {
      // J
      if (!this.isJumping) {
        this.isJumping = true;
        this.dy = -1 * this.speed * 2.5;
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
