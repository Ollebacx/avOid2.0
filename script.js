var ball
var canvasWidth = document.body.clientWidth

function startGame() {
 ball = new component("white", 0, 0, 6);
  myGameArea.start();
}

var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.canvas.style.cursor = "crosshair"; //hide the original cursor
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('mousemove', function (e) {
      var rect = this.canvas.getBoundingClientRect();
      myGameArea.left = rect.left;
      myGameArea.top = rect.top
      myGameArea.x = e.pageX - myGameArea.left;
      myGameArea.y = e.pageY - myGameArea.top;
      console.log(myGameArea.left)
    })
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(color, x, y, radius) {
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill()
  }
}

function updateGameArea() {
  myGameArea.clear();
  if (myGameArea.x && myGameArea.y) {
   ball.x = myGameArea.x;
   ball.y = myGameArea.y;
  }
  ball.update();
}
