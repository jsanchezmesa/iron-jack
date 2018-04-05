function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");

  this.background = new Background(this);
  this.player = new Player(this);
  this.platforms = new Platform(this);
  this.enemies = new Enemy(this);
  this.items = new Item(this);

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
  this.platforms.reset();
  this.items.reset();
  this.enemies.reset();
  this.clear();
  this.start();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();

  this.platforms.draw();
  this.items.draw();

  this.enemies.draw();

  this.player.draw();
};

Game.prototype.move = function() {
  this.player.move();
  this.enemies.move();
};

// detect collision between player and platforms
Game.prototype.platformCollision = function() {
  var collision = false;
  var platform;
  for (var i = 0; i < this.platforms.platformArray.length; i++) {
    if (
      this.player.x <
        this.platforms.platformArray[i].x +
          this.platforms.platformArray[i].width &&
      this.player.x + this.player.width > this.platforms.platformArray[i].x &&
      this.player.y <= this.platforms.platformArray[i].y &&
      this.player.y + this.player.height >= this.platforms.platformArray[i].y
    ) {
      collision = true;
      platform = this.platforms.platformArray[i];
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

// detect collision between player and item
Game.prototype.itemCollision = function() {
  if( this.items.collidesWith(this.player)) {
    this.player.points += 2;
  }
};

// detect collision between player and enemies
Game.prototype.enemyCollision = function() {
  if (this.enemies.collidesWith(this.player)) {
    this.clear();
    this.finishMessage("GAME OVER");
    this.started = false;
    this.player.points = 0;
  }
};

// player gets all items
Game.prototype.finished = function() {
  if (this.items.itemArray.length == 0) {
    this.finishMessage("YOU WIN");

    setTimeout(
      function() {
        this.reset();
      }.bind(this),
      2000
    );
  }
};

Game.prototype.finishMessage = function(message) {
  clearInterval(this.intervalId);
  this.intervalId = 0;

  this.player.level = 1,

  this.ctx.fillStyle = "red";
  this.ctx.font = "40px sans-serif";
  this.ctx.textAlign = "center";
  this.ctx.fillText(
    message,
    this.canvas.width / 2,
    this.canvas.height * 0.33,
    this.canvas.width
  );

  this.ctx.fillStyle = "white";
  this.ctx.fillText(
    this.player.points + " points",
    this.canvas.width / 2,
    this.canvas.height * 0.66,
    this.canvas.width
  );
};
