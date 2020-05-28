
function Map() {
  this.create = function () {
    // this.canvas = config.canvas;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d')
    this.canvas.style.cursor = "crosshair";
    this.resize()
  }
  this.resize = function () {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.position = 'absolute';
    canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
    canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';
  }
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


