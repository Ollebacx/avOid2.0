
var CANVAS = document.getElementById('canvas');
var context = this.canvas.getContext('2d')

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var mouseX = (window.innerWidth - SCREEN_WIDTH - 10);
var mouseY = SCREEN_HEIGHT + 10;

var startBtn = document.getElementById('start-button')
var PLAYING = false;

var enemies = [];
var enemiesQty = 100;

// if (SCREEN_WIDTH < 800) {
//   enemiesQty = 100
// } else {
//   enemiesQty = 100
// }

function Game() {
  //REGISTER EVENT LISTENER
  document.addEventListener('mousemove', function (event) {
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
  }, false);

  // MAP
  this.map = new Map()
  this.map.create()

  //PLAYER
  this.player = new Player();
  this.player.distCollision = this.player.radius - 2;

  //ENEMIES QUANTITY
  for (let i = 0; i < enemiesQty; i++) {
    const x = Math.random() * (SCREEN_WIDTH * 2);
    const y = Math.random() * -SCREEN_HEIGHT;
    this.enemies.push(new Enemy({ x, y }));
  }
  //CREATE ENEMIES BEFORE PLAYING
  if (!PLAYING) {
    BACKGROUND = setInterval(function () {
      if (SCREEN_WIDTH != window.innerWidth || SCREEN_HEIGHT != window.innerHeight) {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        map.resize()
      }
      context.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
      for (var j = 0; j < this.enemies.length; j++) {
        this.enemies[j].create()
      }
    }, 10);
  }

  //START GAME
  if (PLAYING) {
    console.log(PLAYING);
    START = setInterval(function () {
      //RESPONSIVE MAP
      if (SCREEN_WIDTH != window.innerWidth || SCREEN_HEIGHT != window.innerHeight) {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        // console.log(SCREEN_WIDTH)
        map.resize()
      }
      //ELEMENTS MOVES
      context.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
      this.player.create()
      for (var j = 0; j < this.enemies.length; j++) {
        this.enemies[j].create()
        //CHECK ENEMIES COLLISION
        enemyCollision(j)
      }
      //FINISH GAME
      if (this.player.lifeCount === -1) {
        endGame();
        resetGame();
      }
    }, 10);
  }
}

function enemyCollision(j) {
  if (!this.player.invencible) {
    if (this.player && this.player.position.x - this.player.distCollision < this.enemies[j].position.x + this.enemies[j].radius &&
      this.player.position.y - this.player.distCollision < this.enemies[j].position.y + this.enemies[j].radius &&
      this.player.position.x + this.player.distCollision > this.enemies[j].position.x - this.enemies[j].radius &&
      this.player.position.y + this.player.distCollision > this.enemies[j].position.y - this.enemies[j].radius) {
      //LIFE -1
      this.player.lifeCount--
      //DELETE THAT ENEMY
      this.enemies.splice(j, 1)
      //DAMAGE BLINK
      var OFF = setInterval(function () { this.player.fillColor = '#000'; }, 100);
      var ON = setInterval(function () { this.player.fillColor = '#FFF'; }, 200);
      //MAKE PLAYER INVENCIBLE
      this.player.invencible = true;
      //END BLINK & INVENCIBLE
      setTimeout(() => {
        clearInterval(OFF);
        clearInterval(ON);
        this.player.invencible = false;
      }, 1600);
      //CREATE NEW ENEMY
      const x = Math.random() * (SCREEN_WIDTH * 2);
      const y = Math.random() * -SCREEN_HEIGHT;
      this.enemies.push(new Enemy({ x, y }));
    };
  }
}

function endGame() {
  clearInterval(START);
  PLAYING = 0;
  alert('¿QUÉ TE CREÍSTE JORÍO QUE ESTO ES JAUJA O QUÉ? PERDISTE MI NIÑO NO TE QUEDAN VIDAS PERDISTEEE')
}

function resetGame() {
  enemies = [];
  enemiesQty = 100;
  startBtn.classList.remove("desactivate");
  Game();
}

function startGame() {
  clearInterval(BACKGROUND);
  startBtn.classList.add("desactivate");
  PLAYING = 1;
  enemies = [];
  enemiesQty = 100;
  Game();
}
