var ball
var canvasWidth = document.body.clientWidth
var positionsMax = 50;
var positions = [];
var xPos = 400;
var yPos = 250

function startGame() {
  ball = new component("white", xPos, yPos, 6);
  myGameArea.start();
}

var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.canvas.style.cursor = "crosshair";
    this.interval = setInterval(updateGameArea, 15);
    window.addEventListener('mousemove', function (e) { // object follows the mouse
      var rect = this.canvas.getBoundingClientRect();
      myGameArea.left = rect.left;
      myGameArea.top = rect.top
      myGameArea.x = e.pageX - myGameArea.left;
      myGameArea.y = e.pageY - myGameArea.top;
    });
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
    ctx.fill();
//
let history = positions, prevPot, nextPot;
for (let i = 0; i < history.length - 1; i++) {
  ctx.beginPath();
  ctx.arc(positions[i].x, positions[i].y, 1, 0, 2 * Math.PI, true);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  prevPot = history[i];
  nextPot = history[i + 1];
  if (i === 0) {
    ctx.moveTo(prevPot.x, prevPot.y);
  } else {
    // ctx.quadraticCurveTo(prevPot.x, prevPot.y, prevPot.x + (nextPot.x - prevPot.x) / 2, prevPot.y + (nextPot.y - prevPot.y) / 2);
    ctx.lineTo(nextPot.x, nextPot.y);
  }

  prevPot.x -= 2;
  prevPot.y += 2;
}

storeLastPosition(this.x, this.y);

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


function storeLastPosition(xPos, yPos) {
  positions.push({
    x: xPos,
    y: yPos
  })
  if (positions.length > positionsMax) {
    positions.splice(0, positions.length > positionsMax);
  }
};