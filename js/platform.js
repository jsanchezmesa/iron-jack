function Platform(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  // it avoids a line
  this.maxWidth = Math.floor(this.game.canvas.width / 3);
  this.minWidth = 30;
  this.height = 10;    
  
  this.color = "red";

  this.numPlatforms = 5;
  this.platformArray = [];
  this.generatePlatforms();
}

Platform.prototype.generatePlatforms = function() {
  
  while ( this.platformArray.length < this.numPlatforms ) {
    this.generateWidthPlatform();
    var collision = false;
    var platform = {};

    platform.game = this.game;
    platform.x = this.x;
    platform.y = this.y;
    platform.width = this.width;
    platform.height = this.height;
    platform.color = this.color;
    platform.__proto__ = this.__proto__;

    if (this.platformArray.length == 0) {
      // adjust Y position
      var maxY = this.game.canvas.height * 0.8;
      var minY = this.game.canvas.height / 2;
      platform.y = Math.floor( (Math.random() * (maxY - minY + 1)) + minY)
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

// generate random position and width
Platform.prototype.generateWidthPlatform = function() {
  
  this.width = this.generateRandom( this.minWidth, this.maxWidth);
  
  // it sets minimum and maximum X,Y to generate random values
  this.minY = this.game.canvas.height * 0.2;
  this.maxY = this.game.canvas.height - this.game.player.height * 2;
  this.maxX = this.game.canvas.width - this.width;

  this.x = this.generateRandom( 1, this.maxX);
  this.y = this.generateRandom( this.minY, this.maxY);
}

Platform.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}

Platform.prototype.draw = function() {
  this.platformArray.forEach( function(e) {
    e.game.ctx.fillStyle = e.color;
    e.game.ctx.fillRect(e.x, e.y, e.width, e.height);
  });
}

Platform.prototype.collidesWith = function(player){
  if( player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y <= this.y &&
      player.y + player.height >= this.y ) {
        return true;
      }
  return false;
}

Platform.prototype.reset = function() {
  this.platformArray = [];
  this.generatePlatforms();
}