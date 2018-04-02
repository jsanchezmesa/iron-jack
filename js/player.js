function Player(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "https://vignette.wikia.nocookie.net/the-video-game/images/b/bb/Kirby_Sprite.png/revision/latest?cb=20140110173310";
  this.width = 50;
  this.height = 50;

  this.originX = this.game.canvas.width / 2 - this.width / 2; // position on start
  this.originY = this.game.canvas.height - this.height; // positon on start
  this.x = this.originX;
  this.y = this.originY;

  this.speed = 5; // speed to move in x or y
  this.dx = 0; // distance to move in x
  this.dy = 0; // distance to move in y
  this.brakeX = 0.9; // brake x,0 movement
  this.isJumping = false;
  this.isOnPlatform = false;

  this.gravity = 0.25;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
  
  document.onkeydown = function(event) {    
    switch (event.keyCode) {      
      // move left
      // it applies inertia
      case 65: // A key
        if (this.dx > -this.speed) {
          this.dx -= 2;
        }
        break;
      // move right
      // it applies inertia
      case 68: // D key
        if (this.dx < this.speed) {
          this.dx += 2;
        }
        break;
      // jump
      // if player is on floor, it decrease distance (move up) in y
      case 74: // J key
        if (!this.isJumping) {
          this.isJumping = true;
          this.dy = -1 * this.speed * 2.5;
        }
        break;
    }
  }.bind(this);
};

// reset to original position
Player.prototype.reset = function() {
  this.x = this.originX;
  this.y = this.originY;
};
