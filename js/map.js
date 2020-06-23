
function Map() {
  this.create = function () {
    CANVAS.style.cursor = "crosshair";
    this.resize()
  }
  this.resize = function () {
    // console.log(SCREEN_WIDTH)
    CANVAS.width = SCREEN_WIDTH;
    CANVAS.height = SCREEN_HEIGHT;
    CANVAS.style.position = 'absolute';
    CANVAS.style.left = (window.innerWidth - SCREEN_WIDTH) * .5 + 'px';
    CANVAS.style.top = (window.innerHeight - SCREEN_HEIGHT) * .5 + 'px';
  }
}


