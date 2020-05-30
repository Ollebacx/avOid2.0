
var CANVAS = document.getElementById('canvas');
var context = this.canvas.getContext('2d')

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var mouseX = (window.innerWidth - SCREEN_WIDTH - 10);
var mouseY = SCREEN_HEIGHT + 10;

var startBtn = document.getElementById('start-button')
var PLAYING = false;
var PAUSE = false;

var enemies = [];
var enemiesQty = 100;

var score = 0;

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

  //START ANIMATION
  ANIMATION = setInterval(function () {
      if (!PAUSE) {
        //RESPONSIVE MAP
        if (SCREEN_WIDTH != window.innerWidth || SCREEN_HEIGHT != window.innerHeight) {
          SCREEN_WIDTH = window.innerWidth;
          SCREEN_HEIGHT = window.innerHeight;
          map.resize()
        }

        //ERASE CANVAS
        context.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        //BUTTON START TO PLAY
        if (PLAYING) {
          //PLAYER MOVES
          this.player.create();
          //SCORE COUNTS
          score++;
          //FINISH GAME
          if (this.player.lifeCount === -1) {
            endGame();
            resetGame();
          }
        }

        //BACKGROUND ENEMIES
        for (var j = 0; j < this.enemies.length; j++) {
          this.enemies[j].create();
          //CHECK ENEMIES COLLISION PLAYING
          if (PLAYING) {
            enemyCollision(j);
          }
        }

        //GAME PANEL (LEVEL & SCORE)
        context.fillStyle = "rgba(0,0,0, 0.8)";
        context.fillRect(0, 0, this.CANVAS.width, 40);
        context.fillStyle = "rgba(255,255,255, 1)";
        context.font = "32px Quicksand";
        context.fillText("avOid", this.CANVAS.width - 104, 30);
        context.font = "14px Quicksand";
        context.fillText("Level: 1", 20, 25);
        context.fillText("Score: " + score, 80, 25);
      }

  }, 10)
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

function startGame() {
  PLAYING = true;
  enemies = [];
  enemiesQty = 100;
  startBtn.classList.add("desactivate");
  //RESET ENEMIES QUANTITY
  for (let i = 0; i < enemiesQty; i++) {
    const x = Math.random() * (SCREEN_WIDTH * 2);
    const y = Math.random() * -SCREEN_HEIGHT;
    this.enemies.push(new Enemy({ x, y }));
  }
}

function endGame() {
  PLAYING = false;
  alert('¿QUÉ TE CREÍSTE JORÍO QUE ESTO ES JAUJA O QUÉ? PERDISTE MI NIÑO NO TE QUEDAN VIDAS PERDISTEEE')
}

function resetGame() {
  enemies = [];
  enemiesQty = 100;
  startBtn.classList.remove("desactivate");
  clearInterval(ANIMATION);
  Game();
}

function pauseGame() {
  PAUSE = !PAUSE;
  if (PAUSE) {
    context.fillStyle = "rgba(255,255,255, 1)"
    context.fillRect(this.CANVAS.width / 2 - 50, this.CANVAS.height / 2 - 90, 30, 90);
    context.fillRect(this.CANVAS.width / 2 + 10, this.CANVAS.height / 2 - 90, 30, 90);
  }
}

// function playGame() {
//   PLAYING = true;
//   enemies = [];
//   enemiesQty = 100;
//   this.start()
// }

//CHETOS
var color;
function applyRandomColor() {
  var letters = '0123456789ABCDEF';
  color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  this.player.fillColor = color;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'q') {
    this.player.lifeCount = 3;
  }
  if (event.key === 'w') {
    if (this.player.invencible) {
      clearInterval(COLOR);
      this.player.fillColor = '#FFF';
    } else {
      COLOR = setInterval(applyRandomColor, 100);
    }
    this.player.invencible = !this.player.invencible;
  }
  if (event.key === 'e') {
    if (PLAYING) {
      pauseGame();
    }
  }
  // const keyName = event.key;
  // alert('keydown event\n\n' + 'key: ' + keyName);
});
