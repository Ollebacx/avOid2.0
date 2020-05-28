var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

function Game() {
  this.map = new Map(SCREEN_WIDTH, SCREEN_HEIGHT)
  map.create()

  setInterval(function () {
    if (SCREEN_WIDTH != window.innerWidth || SCREEN_HEIGHT != window.innerHeight) {
      SCREEN_WIDTH = window.innerWidth;
      SCREEN_HEIGHT = window.innerHeight;
      map.resize()
    }
  }, 1000 / 60);
}

// canvas.width = window.innerWidth > 1000 ? window.innerWidth - 100 : window.innerWidth
// canvas.height = window.innerHeight > 400 ? window.innerHeight - 20 : window.innerHeight
