
function Player() {
  // console.log(mouseX)
  this.canvas = CANVAS;
  this.context = this.canvas.getContext('2d')
  this.position = { x: -10, y: this.canvas.height + 10 };
  this.shift = { x: -10, y: this.canvas.height + 10 };
  this.radius = 5;
  this.shieldRadius = 15;
  this.speed = 0.08;
  this.fillColor = '#FFF';
  this.positions = [];
  this.maxPositions = 80;
  this.lifePos = 75;
  this.lifeCount = 3;
  this.invencible = false;
  this.invencibleDmg = false;
  this.create = function () {

    if (!SHIELD) { //PARA QUE NO SE DUPLIQUE EN THIS.SHIELD

      // FOLLOW MOUSE WITH LAG
      this.shift.x += (mouseX - this.shift.x) * (this.speed);
      this.shift.y += (mouseY - this.shift.y) * (this.speed);

      // APPLY POSITION
      this.position.x = this.shift.x;
      this.position.y = this.shift.y;
    }

    //PLAYER BODY
    this.context.beginPath();
    this.context.fillStyle = this.fillColor;
    this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();

    //PLAYER TRAIL
    let history = this.positions, prevPot, nextPot;
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.fillColor;

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

    // PLAYER LIFES
    for (let j = 1; j <= this.lifeCount; j++) {
      this.context.beginPath();
      this.context.fillStyle = this.fillColor;
      if (this.positions[this.lifePos - 18 * j] && this.positions[this.lifePos - 18 * j]) {
        this.context.arc(this.positions[this.lifePos - 18 * j].x, this.positions[this.lifePos - 18 * j].y, 3, 0, Math.PI * 2, true);
        this.context.fill();
      }
    }
  };
  this.shield = function () {

    // FOLLOW MOUSE WITH LAG
    this.shift.x += (mouseX - this.shift.x) * (this.speed);
    this.shift.y += (mouseY - this.shift.y) * (this.speed);

    // APPLY POSITION
    this.position.x = this.shift.x;
    this.position.y = this.shift.y;

    //SHIELD BODY
    this.context.beginPath();
    this.context.fillStyle = '#00B2FF';
    this.context.arc(this.position.x, this.position.y, this.shieldRadius, 0, Math.PI * 2, true);
    this.context.fill();
  };
  this.rainbow = function () {
    this.rainbowColor = '#';
    var letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      this.rainbowColor += letters[Math.floor(Math.random() * 16)];
    }
    this.fillColor = this.rainbowColor;
  };
  this.darkness = function () {
    this.context.fillStyle = '#0F0F0F';
    this.context.strokeStyle = '#0F0F0F';
    this.context.lineWidth = 50;
    //LINEA CIRCUNFERENCIA
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, 120, 0, Math.PI * 2, true);
    this.context.stroke();
    //RECTANGULOS DESDE LOS EXTREMOS
    this.context.fillRect(0, 0, this.position.x - 100, this.canvas.height);
    this.context.fillRect(this.position.x + 100, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(0, 0, this.canvas.width, this.position.y - 100);
    this.context.fillRect(0, this.position.y + 100, this.canvas.width, this.canvas.height);
  }
}
