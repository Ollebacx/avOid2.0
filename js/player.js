
function Player() {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: mouseX, y: mouseY };
  this.shift = { x: mouseX, y: mouseY };
  this.size = 10;
  this.speed = 0.09;
  this.fillColor = '#FFF';
  this.create = function () {



    //Player move(first: clear last position)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Follow mouse with some lag
    this.shift.x += (mouseX - this.shift.x) * (this.speed);
    this.shift.y += (mouseY - this.shift.y) * (this.speed);

    // Apply position
    this.position.x = this.shift.x;
    this.position.y = this.shift.y;
    //Player Body
    this.context.beginPath();
    this.context.fillStyle = this.fillColor;
    this.context.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2, true);
    this.context.fill();
  }
  this.trail
}
