
function Enemy(positions) {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: positions.x, y: positions.y };
  this.radius = Math.random() * 3 + 4;
  this.speed = Math.random() * 2 + 1;
  this.fillColor = 'red';
  this.create = function () {

    //ENEMIES MOVE(FIRST:CLEAR CANVAS)
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // APPLY POSITION
      this.position.x -= this.speed;
      this.position.y += this.speed;

    // RESET POSITION WHEN CANVAS END
    if (this.position.x < -10) {
      this.position.x = this.canvas.width + 10 + Math.random() * 30;
    }
    if (this.position.y > this.canvas.height + 10) {
      this.position.y = -10 + Math.random() * -30;
    }

    //ENEMIES BODY
    this.context.beginPath();
    this.context.fillStyle = this.fillColor;
    // console.log(this.position.x)
    this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();
  };
}
