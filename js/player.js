function Player(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "https://cdn.wikimg.net/strategywiki/images/6/6f/MBJ_Jack.png";
  this.width = 50;
  this.height = 50;

  this.originX = this.game.canvas.width/2 - this.width/2; // position on start
  this.originY = this.game.canvas.height - this.height;   // positon on start
  this.x = this.originX;
  this.y = this.originY;

  this.speed = 5;     // speed to move in x or y
  this.dx = 0;        // distance to move in x
  this.dy = 0;        // distance to move in y
  this.brakeX = 0.9; // brake x,0 movement
  this.isJumping = false;

  this.gravity = 0.25;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Player.prototype.move = function() {
  this.dy += this.gravity;      // y move change with gravity

  if( !this.isJumping ) {
    this.dx *= this.brakeX;     // if player is on floor, it brakes when it moves to left or right
  }
  this.x += this.dx;            // increment movement in x
  this.y += this.dy;            // increment movement in y

  // check limits in x
  if( this.x + this.width > this.game.canvas.width ) {
    this.x = this.game.canvas.width - this.width;
  } else if( this.x <= 0 ) {
    this.x = 0;
  }

  // check limits in y
  if( this.y + this.height > this.game.canvas.height ) {
    this.y = this.game.canvas.height - this.height;
    this.isJumping = false;
  } 
}

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch( event.keyCode ) {
      // jump
      // if player is on floor, it decrease distance (move up) in y
      case 74: // J key
      case 87: // W key
      case 38: // Up key
        if( !this.isJumping ) {
          this.isJumping = true;
          this.dy = -this.speed * 2;
        }
        break;
      // move left
      // it applies inertia
      case 65: // A key
      case 37: // Left key
        if( this.dx > -this.speed ) {
          this.dx -= 2;
        }
        break;
      // move right
      // it applies inertia
      case 68: // D key
      case 39: // Right key
        if( this.dx < this.speed ) {
          this.dx += 2;
        }
        break;
    }
  }.bind(this);

  document
}

// reset to original position
Player.prototype.reset = function() {
  this.x = this.originX;
  this.y = this.originY;
}