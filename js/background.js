function Background(game) {
  this.game = game;
  this.x = 0;
  this.y = 0;
  this.width = this.game.canvas.width;
  this.height = this.game.canvas.height;

  this.img = new Image();
  this.img.src = "./img/background.png";
}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
}