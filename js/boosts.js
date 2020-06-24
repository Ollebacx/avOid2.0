function Boost(bPositions) {
  //ADD LIFE BOOST AFTER LEVEL 5
  this.position = { x: bPositions.x, y: bPositions.y };
  this.radius = 10;
  this.speed = (Math.random() + 1) * (level * .4); // SET SPEED BY LEVEL
  if (level > 5) {
    this.arrColors = ['#00B2FF', 'yellow', '#0F0F0F', 'green'];
  } else {
    this.arrColors = ['#00B2FF', 'yellow', '#0F0F0F', 'green']; //'purple', 'orange', 'green'];
  }
  this.fillColor = this.arrColors[Math.floor(Math.random() * this.arrColors.length)]; //'#00B2FF'
  this.create = function () {

    // CHANGE SPEED BY LEVEL ON LIVE BEFORE PLAYING
    if (LEVELCHANGE) {
      this.speed = (Math.random() + 1) * (level * .4); // SET SPEED BY LEVEL
      setTimeout(() => LEVELCHANGE = false, 100)
    }
    // APPLY POSITION BY LEVEL
    this.position.x -= this.speed;
    this.position.y += this.speed;

    // RESET POSITION WHEN CANVAS END
    if (this.position.x < -10) {
      this.position.x = CANVAS.width + 10 + Math.random() * 30;
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

    //SHIELD
    if (this.fillColor === '#00B2FF') {
      context.beginPath();
      context.fillStyle = this.fillColor;
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      context.fill();
      context.fillStyle = "rgba(255,255,255, 1)";
      context.font = "15px Quicksand";
      context.fillText("S", this.position.x - 4, this.position.y + 5);
    }
    //RAINBOW
    else if (this.fillColor === 'yellow') {
      context.drawImage(STAR, this.position.x - 12, this.position.y - 12, 24, 24)
      // context.beginPath();
      // context.fillStyle = this.fillColor;
      // context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      // context.fill();
    }
    //DARKNESS
    else if (this.fillColor === '#0F0F0F') {
      context.beginPath();
      context.fillStyle = this.fillColor;
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      context.fill()
    }
    //GRAVITY
    else if (this.fillColor === 'purple') {
      context.beginPath();
      context.fillStyle = this.fillColor;
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      context.fill()
    }
    //LIFE UP
    else if (this.fillColor === 'green') {
      context.beginPath();
      context.fillStyle = this.fillColor;
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
      context.fill()
      context.fillStyle = "rgba(255,255,255, 1)";
      context.font = "10px Quicksand";
      context.fillText("Up", this.position.x - 6, this.position.y + 3);
    }
  }
}
