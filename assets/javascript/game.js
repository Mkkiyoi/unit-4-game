/*
 * Javascript code to run the Star Wars RPG.
 */

(function () {
    'use strict'

    /* Object containing the Star Wars RPG logic. */
    var starWarsGame = {

        /* 
         * Character object representing the playable characters in the RPG.
         * Each character has attack, counter-attack, and hp.
         */
        character: {
            attackPower: 0,
            counterAttackPower: 0,
            hitpoints: 0,
            name: '',

            /**
             * 
             * @param {int} ap 
             * @param {int} cap 
             * @param {int} hp 
             * @param {String} name 
             * 
             * Creates a new character with the above parameters.
             */
            character: function(ap, cap, hp, name) {
                this.attackPower = ap;
                this.counterAttackPower = cap;
                this.hitpoints = hp;
                this.name = name;
            }
        },

        // Array of all characters in the game.
        characters: [],

        // Player's chosen character for the current game.
        playerCharacter: null,

        // Enemies for the current game. 
        enemies: [],

        // Defending enemy.
        defender: null,

        // Store all characters default state.
        defaultCharacters: [],

        /* 
         * On player click, assign player's character to be the one that was clicked.
         * Assign all other characters to be enemies.
         */
        createCharacters: function() {
            $('.character').each(function(i, character) {
                var ap = $(this).data('ap');
                var cap = 2;
                var hp = $(this).data('hp');
                var name = $(this).attr('id');
                var newCharacter = new starWarsGame.character.character(ap, cap, hp, name);
                starWarsGame.characters.push(newCharacter);
            });
            starWarsGame.defaultCharacters = starWarsGame.characters;
        },

        /**
         * 
         * @param {event} event
         * 
         * Enables player to choose which character to use for the current game.
         * Saves character choice as a global playerCharacter.
         */
        chooseCharacter: function(event) {
            starWarsGame.characters.forEach(function(ch) {
                if (ch.name === $(event.currentTarget).attr('id')) {
                    $(ch).off('click');
                    starWarsGame.playerCharacter = ch;
                } else {
                    starWarsGame.enemies.push(ch);
                }
                starWarsGame.moveEnemies();
            });
        },

        /**
         * Moves enemies to enemy area.  
         * Enables choosing which enemy to attack.
         */
        moveEnemies: function() {
            this.enemies.forEach(function(enemy) {
                var enemyCharacter = $('#' + enemy.name);
                $(enemyCharacter).off('click');
                $(enemyCharacter).on('click', starWarsGame.chooseEnemy);
                $(enemyCharacter).appendTo('#enemies');
            });
        },

        /**
         * @param {event} event
         * 
         * Player chooses enemy to attack.
         * Moves the enemy chosen to the defender area.
         * Enables attacks.
         */
        chooseEnemy: function(event) {
            $(event.currentTarget).appendTo('#defender');
            starWarsGame.characters.forEach(function(ch) {
                if (ch.name === $(event.currentTarget).attr('id')) {
                    starWarsGame.defender = ch;
                    starWarsGame.enemies.pop(ch)
                }
                $('#' + ch.name).off('click')
            });
            $('#attack').on('click', starWarsGame.attack);
        },

        /**
         * Current player character makes an attack on the current defending character.
         * Doubles player attack power.
         * Checks if enemy or player is defeated 
         */
        attack: function() {
            starWarsGame.playerCharacter.hitpoints -= starWarsGame.defender.counterAttackPower;
            starWarsGame.defender.hitpoints -= starWarsGame.playerCharacter.attackPower;
            starWarsGame.playerCharacter.attackPower *= 2;
            $('#' + starWarsGame.playerCharacter.name + '-hp').text(starWarsGame.playerCharacter.hitpoints);
            $('#' + starWarsGame.defender.name + '-hp').text(starWarsGame.defender.hitpoints);
            starWarsGame.isEnemyDefeated();
        },

        /**
         * Checks if an enemy has been defeated. Enemies are defeated if they have 0 or less hitpoints. 
         * Also checks if there are enemies left to fight. If not the game is over and the player
         *  can choose to reset.
         * Checks if the player is defeated. If so do not allow attacking and player must reset the gamge.
         */
        isEnemyDefeated: function() {
            if (starWarsGame.defender.hitpoints <= 0) {
                $('#' + starWarsGame.defender.name).appendTo('#defeated');
                $('#enemies div').on('click', starWarsGame.chooseEnemy);
                $('#attack').off('click');
                if (starWarsGame.enemies.length === 0) {
                    console.log('Won the game')
                }
            } 
            if (starWarsGame.playerCharacter.hitpoints <=0) {
                $('#attack').off('click');
            }
        },

        /**
         * Reset game to new game state with no character assigned to any role. 
         */
        resetGame: function() {
            
            // Reset all characters in the game.
            starWarsGame.characters = [];
            starWarsGame.enemies = [];
            starWarsGame.playerCharacter = null;
            starWarsGame.defender = null;

            // Create new characters objects.
            starWarsGame.createCharacters();

            // Reset character's hp value and move characters to character choice section.
            starWarsGame.defaultCharacters.forEach(function(ch) {
                $('#' + ch.name + '-hp').text(ch.hitpoints);
                $('#' + ch.name).appendTo('#characters');
                $('#' + ch.name).on('click', starWarsGame.chooseCharacter);
            });
        }
    }

    /**
     * Runs game when the document is fully loaded.
     */
    $(document).ready(function () {
        starWarsGame.resetGame();
        $('#reset').on('click', starWarsGame.resetGame);
    });
})();