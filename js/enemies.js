
function Enemy(positions) {
  this.position = { x: positions.x, y: positions.y };
  this.radius = Math.random() * 2 + 3.5;
  this.variableSize = this.radius;
  this.speed = (Math.random() + .1);
  this.variableSpeed = this.speed + level/2 ;
  this.fillColor = 'red';
  this.create = function () {

    var speedIncrement = level/2 ;

    // CHANGE SPEED BY LEVEL ON LIVE BEFORE PLAYING
    if (LEVELCHANGE) {
      this.variableSpeed = this.speed + speedIncrement; // SET SPEED BY LEVEL
      setTimeout(() => LEVELCHANGE = false, 100)
    }
    // APPLY POSITION BY LEVEL
    this.position.x -= this.variableSpeed;
    this.position.y += this.variableSpeed;

    // RESET POSITION WHEN CANVAS END
    if (this.position.x < -10) {
      this.position.x = canvas.width + 10 + Math.random() * 30;
      if (PLAYING && !SLOWTIME) {
        this.variableSpeed = this.speed + speedIncrement; //INCREASE SPEED BY LEVEL WHEN IS OUT OF CANVAS
      }
    }
    if (this.position.y > CANVAS.height + 10) {
      this.position.y = -10 + Math.random() * -30;
      if (PLAYING && !SLOWTIME) {
        this.variableSpeed = this.speed + speedIncrement; //INCREASE SPEED BY LEVEL WHEN IS OUT OF CANVAS
      }
    }

    //ENEMIES BODY
    context.beginPath();
    context.fillStyle = this.fillColor;
    // console.log(this.position.x)
    context.arc(this.position.x, this.position.y, this.variableSize, 0, Math.PI * 2, true);
    context.fill();
  };
  // SLOW BOOST
  this.reduceSpeed = function (n) {
    var speedIncrement = level/2 ;
    this.variableSpeed = (this.speed + speedIncrement) / n;
    if (n < 1) {
      clearInterval(slowerTimer);
      SLOWTIME = false;
    }
  };
  this.reduceSize = function (n) {
    this.variableSize = this.radius / n;
    if (n < 1) {
      clearInterval(smallerTimer);
      SMALLER = false;
    }
  }
}
