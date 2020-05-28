
function Player() {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: mouseX, y: mouseY };
  this.shift = { x: mouseX, y: mouseY };
  this.size = 10;
  this.speed = 0.09;
  this.fillColor = '#FFF';
  this.positions = [];
  this.maxPositions = 60;
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

    //Player Trail
    let history = this.positions, prevPot, nextPot;
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.lineCap = 'round'
    this.context.strokeStyle = '#F1F1F1';

    for (let i = 0; i < history.length - 1; i++) {
      prevPot = history[i];
      nextPot = history[i + 1];
      if (i === 0) {
        this.context.moveTo(prevPot.x, prevPot.y);
      } else {
        this.context.lineTo(nextPot.x, nextPot.y);
      }
      //DIAGONAL TRAIL POSITION
      prevPot.x -= 0.8;
      prevPot.y += 0.8;
    }
    this.context.stroke();

    //HISTORY REGISTER
    this.positions.push({
      x: this.position.x,
      y: this.position.y
    })

    //CLEAR TRAIL END POSITION
    if (this.positions.length > this.maxPositions) {
      this.positions.splice(0, this.positions.length > this.maxPositions);
    }
  }
}
