# Frogger Web Game Project3 Udacity FEND
Assignment #3 from Udacity Front-End Web Development Nanodegree.

For this project I used existing template provided by Udacity. This is a java script based game, so majority of the coding happened in .js files, mainly app.js. Index.html and .css files were edited too for additional functionality like UI and leaderboard.

# Running the game on your computer
1. Clone the repo
2. open index.html file
3. Play!

# Game rules
The goal of the game to reach water without hitting a bug as many times as possible. On every collision with a bug player loses one life.

Before starting a game, player is prompted to type his/her name that later will be used in a leaderboard
(leaderboard is local and gets erased when a page is refreshed)

* Player starts with 3 lives that are visible at the top left corner
* After reaching water player is reset to the beginning and ready to go again
* Hitting a bug will reset player position and remove a life
* Every time player reaches water the game gets slightly harder by increasing the speed of bugs and adds one bug

After losing all lives the game is over, new record is added to a leaderboard, entries are added as they come without sorting. And player can start a new game.

# Third party libraries and dependencies used in this project
* jQuery library is used
* font from Google library

Thank you for playing a game!
