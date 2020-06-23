
function Particle(position, enemyRad) {
  this.r = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
  this.position = { x: position.x, y: position.y };
  this.radius = .1;
  this.speed = Math.random() * 0.05 ;
  this.rotation = Math.random() * 360;
  this.friction = 0.9997;
  this.xVel = 0;
  this.yVel = 0;
  this.gravity = 1 / 200000;
  this.fillColor = 'red';
  this.create = function () {

    //PATH FOR EACH PARTICLE
    this.position.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
    this.position.y += this.speed * Math.sin(this.rotation * Math.PI / 180);

    //PHYSICS
    this.speed *= this.friction;
    this.radius *= this.friction;
    this.xVel += this.gravity;
    this.yVel += this.gravity;
    this.position.x -= this.xVel;
    this.position.y += this.yVel;

    //STOP DRAWING
    if (this.radius < 0.05) {
      // console.log("hi");
    } else {
    //PARTICLES BODY
      context.beginPath();
      context.fillStyle = this.fillColor;
      context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
      context.fill();
    }
  };
};
