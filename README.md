# unit-4-game

### Live Versions of the Games
* [Crystal Collector](mkkiyoi.github.io/unit-4-game/crystal-game.html)

* [Star Wars Game](mkkiyoi.github.io/unit-4-game)

### How do the games work?

The unit-4-game repository contains two different games, the Crystal Collector game and the Star Wars RPG.

#### Crystal Collector
* The object of the game is to match the randomly selected value by clicking on the crystals, adding a certain amount of points each time.
* The player wins the game if their score matches the random value exactly.
* The player loses the game if their score goes above the value.
* The values of the crystals are initially hidden until each is clicked on.
* On win or loss, the game will choose a new random value and reset players score.

#### Star Wars RPG
* The object of this game is to defeat a total of 3 enemies with the chosen character.
* The player chooses a character by clicking on them. The other 3 characters are now enemies.
* The player then chooses the enemy they want to fight by clicking on them.
* The player will then attack the defender until either the defender dies or the player dies.
* On attack the players attack doubles everytime, however the defenders counter-attack power stays the same.
* each character has unique attack and hp values.
* The game can be reset by pressing the reset button.

### Star Wars RPG Logic
* The logic of the game is contained in [game.js](assets/js/game.js).
* Some styling is contained in [style.css](assets/css/style.css).
* And of course the HTML structure with Bootstrap styling and design is contained in [index.html](index.html).

### Crystal Game Logic 
* The logic of the game is contained in [game.js](assets/js/crystal-game.js).
* Some styling is contained in [style.css](assets/css/crystal-game.css).
* And of course the HTML structure with Bootstrap styling and design is contained in [index.html](crystal-game.html).

### Assets
* All assets can be found [here](assets).
* CSS Stylesheets can be found [here](assets/css).
* Images can be found [here](assets/images).
* Javascript for the game can be found [here](assets/js/game.js).
