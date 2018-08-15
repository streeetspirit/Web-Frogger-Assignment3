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
  // if an enemy goes out of the screen reset his position and speed with random parameters
  update(dt) {
    this.x += this.speed * dt;
    //checkCollision(player);
    if (this.x > width) {
      this.randomizeParam();
    }

  }

  // Draw the enemy on the screen
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  randomizeParam() {
    this.speed = (Math.random() * 200) + 100 * (level-1);
    this.y = Math.floor((Math.random() * 3) + 1)*83-20;
    this.x = Math.floor(-tile*(Math.random()*3 + 1));
  }

};


// player class

class Player {
  constructor (sprite) {
    this.sprite = sprite;
    this.current_sprite = sprite[0];
    this.size = 101;
    //find position for left top corner of the sprite
    this.x = (width - this.size)/2;
    this.y = height - 171;
    this.lives = 3;
    this.points = 0;
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
    if (this.y < 77) {
      gameBreak = true;
      win();
    }

  }

  // Draw on the screen
  render() {
      ctx.drawImage(Resources.get(this.current_sprite), this.x, this.y);
  }

  handleInput(key) {
    if (!gameBreak) {
      switch (key) {
        case 'left': this.x -= tile;
        break;
        case 'up': this.y -= tile_y;
        break;
        case 'right': this.x += tile;
        break;
        case 'down': this.y += tile_y;
        break;
      }
    }

  }

};

//all enemies check if any collision with a player happened
function checkCollision(enemies,player) {
  if (!gameBreak) {
    for (enemy of enemies) {
      if (enemy.y===(player.y-15) && !(enemy.x > (player.x + tile-35) ||  (enemy.x + tile-35) < player.x )) {
        gameBreak = true;
        lose();
      }
    }
  }
}

// every time player hits a bug it flickers red, freezes for a moment then resets
// remove one life point, in case there are 0 lives - do game over
function lose() {
  player.current_sprite = player.sprite[2];
  setTimeout(function() {
    reset();
    player.current_sprite = player.sprite[0];
    gameBreak = false;
  }, 250);
  player.lives --;
  if (player.lives<=0) {
    gameBreak = true;
    gameOver();
  }
  console.log(player.lives);
}

// winning scenario - flicker green,
// pause the player update for a moment before resetting it back to the start
function win() {
  player.current_sprite = player.sprite[1];
  setTimeout(function() {
    reset();
    player.current_sprite = player.sprite[0];
    gameBreak = false;
  }, 500);
  level++;
  player.points ++;
  console.log(player.points);
}

function reset() {
  player.x = (width - player.size)/2;
  player.y = height - 171;
}

// when the player is out of lives, game is stopped by overlaying gameover screen
// player record is added to a leaderboard
function gameOver() {
  var date = getTime();
  scoreRecord = `<li>On ${date}<strong> ${name}</strong>, `;
  if (player.points===1) {
    scoreRecord += `reached water:<strong> ${player.points} time</strong></li>`;
  } else {
    scoreRecord += `reached water:<strong> ${player.points} times</strong></li>`;
  }
  $("#scoreboard").append(scoreRecord);
  showGameOverScreen();
}

function getTime() {
let d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

function showGameOverScreen () {
  $(".popup").css("display", "block");
  $(".gameover").css("display", "inline");
}

// parameter to set tiny pauses when player wins or get hit
let gameBreak = false;

/* param level - sets up difficulty (amount of enemies spawned)
 * then create an array of enemies
 * enemies get random position between 3 lanes and a random speed between 200 and 400 for level 3 (it's proportional to difficulty)
 */
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// if enemy has reached the end of the screen remove it from the array
// Place the player object in a variable called player
var allEnemies = [];
let avatar="boy";
let name;
var player = new Player(['images/char-boy.png', 'images/char-boy-blue.png','images/char-boy-red.png']);
let level = 3;

function spawnEnemies (level) {
  for (let i = 0; i < level+1; i++) {
    const enemy = new Enemy(Math.floor((Math.random() * 200) + 100 * (level-1)), Math.floor((Math.random() * 3) + 1)*83-20, Math.floor(-tile*(Math.random()*3 + 1)));
    allEnemies.push(enemy);
  }
}

//choose player character


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

let scoreRecord;
// saving user's data in the Popup
// hide the popup
$(".ok").click(function startGame(event) {
  name = $(".input").val();

  $(".popup").css("display", "none");
  $(".gameover").css("display", "none");
  spawnEnemies(level);
  if ($("#girl").hasClass("highlight")) {
    avatar='girl';
    player = new Player(['images/char-cat-girl.png', 'images/char-cat-girl-blue.png','images/char-cat-girl-red.png']);
  } else {
    avatar="boy";
    player = new Player(['images/char-boy.png', 'images/char-boy-blue.png','images/char-boy-red.png']);
  }

});

// if Enter key is pressed in the input field - do the same as if Ok button is pressed
$(".input").keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $(".ok").click();
  }
});

$("#boy").click(function chooseBoy(event) {
    if ($("#girl").hasClass("highlight")) {
      $("#girl").removeClass("highlight");
      $("#boy").addClass("highlight");
    }
});

$("#girl").click(function chooseGirl(event) {
    if ($("#boy").hasClass("highlight")) {
      $("#boy").removeClass("highlight");
      $("#girl").addClass("highlight");
    }
});
