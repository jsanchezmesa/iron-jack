function Item(game) {
  this.game = game;

  this.x = 0;
  this.y = 0;

  this.width = 20;
  this.height = this.width;
  
  this.maxX = this.game.canvas.width - this.width;
  this.maxY = this.game.canvas.height - this.height;

  this.img = new Image();
  this.img.src = "./img/item.png";

  this.numItems = 25;
  this.itemArray = [];
  this.generateItems();

  this.itemSound = new Audio("./sounds/coin.mp3");
}

Item.prototype.generateItems = function() {
  while( this.itemArray.length < this.numItems ) {
    this.generateRandomPosition();

    var collision = false;
    var item = {};
    item.game = this.game;
    item.x = this.x;
    item.y = this.y;
    item.width = this.width;
    item.height = this.height;
    item.img = this.img;
    item.__proto__ = this.__proto__;

    if( this.itemArray.length == 0 ) {
      if( !this.platformCollision( item ) ) {
        this.itemArray.push(item);
      }
    } else {
      // check collision between items
      this.itemArray.forEach( function(e) {
        if( item.x < e.x + e.width &&
          item.x + item.width > e.x &&
          item.y < e.y + e.height &&
          item.y + item.height > e.y ) {
            collision = true;
          }
      });

      if( !collision ) {
        if( !this.platformCollision( item ) ) {
          this.itemArray.push(item);
        }
      }      
    }
  }
}

// collision between platform and items
Item.prototype.platformCollision = function(item) {
  var collision = false;

  this.game.platforms.platformArray.forEach( function(e) {
    if( item.x < e.x + e.width &&
      item.x + item.width > e.x &&
      item.y < e.y + e.height &&
      item.y + item.height > e.y ) {
        
      collision = true;
    }
  })

  return collision;
}

// generate random position
Item.prototype.generateRandomPosition = function() {
  this.x = this.generateRandom( 0 + this.width, this.maxX );
  this.y = this.generateRandom( 0 + this.width, this.maxY );
}

Item.prototype.draw = function() {
  this.itemArray.forEach( function(e) {
    e.game.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
  })
}

Item.prototype.generateRandom = function(min, max) {
  return Math.floor( Math.random() * (max-min+1)) + min;
}

Item.prototype.collidesWith = function(player){
  var collision = false;  
  this.itemArray.forEach( function(e, i) {
    if( player.x <= e.x + e.width &&
      player.x + player.width >= e.x &&
      player.y <= e.y + e.height &&
      player.y + player.height >= e.y ) {
        this.itemSound.play();
        this.itemArray.splice(i, 1);
        collision = true;
      }
  }.bind(this));
  
  return collision;
}

Item.prototype.reset = function() {
  if( this.itemArray.length == 0 ) {
    this.game.player.level++;
  }
  this.itemArray = [];
  this.generateItems();
}