
function Enemy(positions) {
  this.position = { x: positions.x, y: positions.y };
  this.radius = Math.random() * 2 + 4;
  this.speed = (Math.random() + 1) * (level * .4); // SET SPEED BY LEVEL
  this.fillColor = 'red';
  this.create = function () {

    // CHANGE SPEED BY LEVEL ON LIVE BEFORE PLAYING
    if (LEVELCHANGE) {
      this.speed = (Math.random() + 1) * (level * .4); // SET SPEED BY LEVEL
      setTimeout(()=> LEVELCHANGE = false, 100)
    }
    // APPLY POSITION BY LEVEL
    this.position.x -= this.speed;
    this.position.y += this.speed;

    // RESET POSITION WHEN CANVAS END
    if (this.position.x < -10) {
      this.position.x = canvas.width + 10 + Math.random() * 30;
      if (PLAYING) {
        this.speed = (Math.random() + 1) * (level * .4); //INCREASE SPEED BY LEVEL WHEN IS OUT OF CANVAS
      }
    }
    if (this.position.y > CANVAS.height + 10) {
      this.position.y = -10 + Math.random() * -30;
      if (PLAYING) {
        this.speed = (Math.random() + 1) * (level * .4); //INCREASE SPEED BY LEVEL WHEN IS OUT OF CANVAS
      }
    }

    //ENEMIES BODY
    context.beginPath();
    context.fillStyle = this.fillColor;
    // console.log(this.position.x)
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
  };
}
