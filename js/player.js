
function Player() {
  this.position = { x: -10, y: CANVAS.height + 10 };
  this.shift = { x: -10, y: CANVAS.height + 10 };
  this.radius = 4;
  this.distCollision = this.radius - 2;
  this.shieldRadius = 15;
  this.speed = 0.2;
  this.fillColor = '#FFF';
  this.positions = [];
  this.maxPositions = 70;
  this.lifePos = 70;
  this.lifeCount = 2;
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
    context.beginPath();
    context.fillStyle = this.fillColor;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    context.fill();

    //PLAYER TRAIL
    let history = this.positions, prevPot, nextPot;
    context.beginPath();
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = this.fillColor;

    for (let i = 0; i < history.length - 1; i++) {
      prevPot = history[i];
      nextPot = history[i + 1];
      if (i === 0) {
        context.moveTo(prevPot.x, prevPot.y);
      } else {
        context.lineTo(nextPot.x, nextPot.y);
      }
      //DIAGONAL TRAIL POSITION
      prevPot.x -= this.speed * 5;
      prevPot.y += this.speed * 5;
    }
    context.stroke();

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
      context.beginPath();
      context.fillStyle = this.fillColor;
      if (this.positions[this.lifePos - 14 * j] && this.positions[this.lifePos - 14 * j]) {
        context.arc(this.positions[this.lifePos - 14 * j].x, this.positions[this.lifePos - 14 * j].y, 3, 0, Math.PI * 2, true);
        context.fill();
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
    context.beginPath();
    context.fillStyle = '#00B2FF';
    context.arc(this.position.x, this.position.y, this.shieldRadius, 0, Math.PI * 2, true);
    context.fill();
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
    context.fillStyle = '#0F0F0F';
    context.strokeStyle = '#0F0F0F';
    context.lineWidth = 50;
    //LINEA CIRCUNFERENCIA
    context.beginPath();
    context.arc(this.position.x, this.position.y, 120, 0, Math.PI * 2, true);
    context.stroke();
    //RECTANGULOS DESDE LOS EXTREMOS
    context.fillRect(0, 0, this.position.x - 100, CANVAS.height);
    context.fillRect(this.position.x + 100, 0, CANVAS.width, CANVAS.height);
    context.fillRect(0, 0, CANVAS.width, this.position.y - 100);
    context.fillRect(0, this.position.y + 100, CANVAS.width, CANVAS.height);
  }
}
