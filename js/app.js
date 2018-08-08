const width = 101*5;
const height = 83*7;
// Enemies our player must avoid
class Enemy {
  constructor (speed, y) {
    // The image/sprite for our enemies, moving speed, and starting position
    this.sprite = 'images/enemy-bug.png';
    this.size = 101;
    this.x = -this.size;
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
  checkCollision(player) {
    if (this.y===player.y && !(this.x > player.x + player.size ||  this.x + this.size < player.x )) {
      detectedCollision();
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

  update() {

  }

  // Draw on the screen
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {

  }

};

let level = 3;
var allEnemies = [];

for (let i = 0; i < level; i++) {
  const enemy = new Enemy(Math.floor((Math.random() * 200) + 200), Math.floor((Math.random() * 3) + 1)*83-20);
  console.log(enemy);
  allEnemies.push(enemy);
}
console.log(allEnemies);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// if enemy has reached the end of the screen remove it from the array
// Place the player object in a variable called player
var player = new Player('images/char-boy.png');

function detectCollision() {

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
