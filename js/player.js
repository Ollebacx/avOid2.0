
function Player() {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: mouseX, y: mouseY };
  this.shift = { x: mouseX, y: mouseY };
  this.radius = 5;
  this.speed = 0.08;
  this.fillColor = '#FFF';
  this.positions = [];
  this.maxPositions = 80;
  this.lifePos = 75;
  this.lifeCount = 3;
  this.create = function () {

    //PLAYER MOVE(FIRST:CLEAR CANVAS)
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // FOLLOW MOUSE WITH LAG
    this.shift.x += (mouseX - this.shift.x) * (this.speed);
    this.shift.y += (mouseY - this.shift.y) * (this.speed);

    // APPLY POSITION
    this.position.x = this.shift.x;
    this.position.y = this.shift.y;

    //PLAYER BODY
    this.context.beginPath();
    this.context.fillStyle = this.fillColor;
    this.context.arc(this.position.x, this.position.y,this.radius, 0, Math.PI * 2, true);
    this.context.fill();

    //PLAYER TRAIL
    let history = this.positions, prevPot, nextPot;
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
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
      prevPot.x -= this.speed * 10;
      prevPot.y += this.speed * 10;
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

    // PLAYER LIFE
    for (let j = 1; j <= this.lifeCount; j++) {
      this.context.beginPath();
      this.context.fillStyle = this.fillColor;
      this.context.arc(this.positions[this.lifePos - 18*j].x, this.positions[this.lifePos - 18*j].y, 3 , 0, Math.PI * 2, true);
      this.context.fill();
    }

  }
}
