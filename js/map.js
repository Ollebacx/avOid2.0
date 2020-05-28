
function Map() {
  this.create = function () {
    this.canvas = CANVAS;
    this.context = this.canvas.getContext('2d')
    this.canvas.style.cursor = "crosshair";
    this.resize()
  }
  this.resize = function () {
    // console.log(SCREEN_WIDTH)
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
    canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';
  }
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


