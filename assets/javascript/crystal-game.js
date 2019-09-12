(function () {
    'use strict'

    /* Object containing the Crystal Collector Game. */
    var crystalGame = {

        // Total player score
        score: 0,

        // Score to be matched by the player
        randomScore: 0,

        // Number of wins
        wins: 0,

        // Number of losses
        losses: 0,

        /* Gets a random number between min and max. */
        getRandomNumber(min, max) {
            return Math.floor((Math.random() * max) + min);
        },

        /* Gets a random score for the player to match */
        getRandomScore: function() {

            // Computes a random number between 19-120
            this.randomScore = this.getRandomNumber(19, 120);
            
            // Sets the text content of #random-score to the chosen score
            $('#random-score').text(this.randomScore);
        },

        /* Displays the current total score */
        displayTotalScore: function() {
            $('#score').text(this.score);
        },

        /* 
         * Checks if the game is over by checking if the players 
         * score is equal or over the chosen random score. 
         */
        isGameOver: function() {
            if (this.score == this.randomScore) {
                this.wins += 1;
                this.resetGame();
            } else if (this.score > this.randomScore) {
                this.losses += 1;
                this.resetGame();
            }
        },

        /* Assigns each crystal with a score from 1-12 */
        getCrystalScore: function() {
            $('.crystal').each(function(i, crystal) {
                $(this).val(crystalGame.getRandomNumber(1, 12));
            });
        },

        /* 
         * Adds the point value of the crystal to the players current total score. 
         * Also calls isGameOver after adding the score to check game state.
         */
        addCrystalScore: function(event) {
            crystalGame.score += parseInt($(event.currentTarget).val());
            crystalGame.displayTotalScore();
            crystalGame.isGameOver();
        },

        /* Resets the game to new game state. Does not reset wins and losses to 0. */
        resetGame: function() {

            // Gets a new random score
            this.getRandomScore();

            // Displays wins
            $('#wins').text(this.wins);

            // Displays losses
            $('#losses').text(this.losses);

            // Resets total score
            this.score = 0;
            this.displayTotalScore();

            // Re-assigns crystal score values.
            this.getCrystalScore();

        }

    }

    /* Load game as soon as document is ready. */
    $(document).ready(function() {

        // Set onclick event handler to addCrystal Score
        $('.crystal').on('click', crystalGame.addCrystalScore);

        // Resets the total score and chooses a new random number. 
        // Also updates wins and losses.
        crystalGame.resetGame();
    });
})();