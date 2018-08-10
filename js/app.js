const tile = 101;
const tile_y = 83;
const width = tile*5;
const height = 83*7;

// Enemies our player must avoid
class Enemy {
  constructor (speed, y, x = -tile) {
    // The image/sprite for our enemies, moving speed, and starting position
    this.sprite = 'images/enemy-bug.png';
    this.size = tile;
    this.x = x;
    this.y = y;
    this.speed = speed;

  }

  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;
    //checkCollision(player);
    if (this.x > width) {
      this.x = -this.size;
    }

  }

  // Draw the enemy on the screen
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //enemies check if any collision with a player happened
  static checkCollision(enemies,x,y) {
    for (enemy of enemies) {
      if (enemy.y===y && !(enemy.x > x + tile ||  enemy.x + tile < x )) {
      detectedCollision();
    }
  }
  }

};


// player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor (sprite) {
    this.sprite = sprite;
    this.size = 101;
    //find position for left top corner of the sprite
    this.x = (width - this.size)/2;
    this.y = height - 171;

  }

// check if a player drifted off the screen
// if a player reached the top water layer - add points and reset the player
  update() {
    if (this.x > width-tile) {
      this.x = width-tile;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > height-171) {
      this.y = height-171;
    }
    if (this.y < tile_y) {
      win();
      reset();
    }
  }

  // Draw on the screen
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'left': { this.x -= tile; console.log(key);};
      break;
      case 'up': this.y -= tile_y;
      break;
      case 'right': this.x += tile;
      break;
      case 'down': this.y += tile_y;
      break;

    }
  }

};

function detectCollision() {

}

function win() {

}

function reset() {

}
/* param level - sets up difficulty (amount of enemies spawned)
 * then create an array of enemies
 * enemies get random position between 3 lanes and a random speed between 200 and 400 for level 3 (it's proportional to difficulty)
 */
let level = 3;
var allEnemies = [];
for (let i = 0; i < level+1; i++) {
  const enemy = new Enemy(Math.floor((Math.random() * 200) + 100 * (level-1)), Math.floor((Math.random() * 3) + 1)*83-20, Math.floor(-tile*(Math.random()*3 + 1)));
  allEnemies.push(enemy);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// if enemy has reached the end of the screen remove it from the array
// Place the player object in a variable called player
var player = new Player('images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});
