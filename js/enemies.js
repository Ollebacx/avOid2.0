
function Enemies() {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: 500, y: -10 };
  this.size = 10;
  this.speed = 3;
  this.fillColor = 'red';
  this.enemies = [];
  this.maxEnemies = 60;
  this.create = function () {

    //ENEMIES MOVE(FIRST:CLEAR CANVAS)
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // APPLY POSITION
    this.position.x -= this.speed;
    this.position.y += this.speed;

    //ENEMIES BODY
    this.context.beginPath();
    this.context.fillStyle = this.fillColor;
    console.log(this.position.x)
    this.context.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2, true);
    this.context.fill();
  }
}
