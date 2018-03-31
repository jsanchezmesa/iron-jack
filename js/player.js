function Player(game) {
  this.game = game;

  this.initialX = this.game.canvas.width / 2;
  this.initialY = this.game.canvas.height / 2;
  this.x = this.initialX;
  this.y = this.initialY;
  
  this.img = new Image();
  this.img.src = "https://cdn.wikimg.net/strategywiki/images/6/6f/MBJ_Jack.png";
  this.width = 50;
  this.height = 60;
  
  this.sy = 20;
  this.dy = 5;
  this.dx = 5;

  this.gravity = 0.9;
  this.isOnFloor = false;

  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Player.prototype.move = function() {

  if( !this.isOnFloor ) {
    this.dy += this.gravity;
    this.y += this.dy;
  }

  if( this.y + this.height > this.game.canvas.height ) {
    this.isOnFloor = true;
  }

}

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch(event.keyCode) {
      case 74: // J key
      case 87: // W key
        if( this.y > 0 ) {
          this.y -= this.dy;
        }
        break;
      case 65: // A key
        if( this.x > 0 ) {
          this.x -= this.dx;
        }
        break;
      case 83: // S key
        if( this.y < this.game.canvas.height ) {
          this.y += this.dy;
        }
        break;
      case 68: // D key
        if( this.x + this.width < this.game.canvas.width ) {
          this.x += this.dx;
        }
        break;
    } 
  }.bind(this);
}

Player.prototype.reset = function() {
  this.x = this.initialX;
  this.y = this.initialY;
  this.dy = 1;
}
