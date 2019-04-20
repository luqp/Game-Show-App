/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(container, phrases, scoreBar, overlay, active = false) {
        this.missed = 0;
        this.phrases = phrases;
        this.board = new Board(container)
        this.scoreBar = scoreBar;
        this.overlay = overlay;
        this.active = active;
    }

    getRandomPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[index];
    }
    
    starGame() {
        this.active = true;
        this.missed = 0;
        this.board.drawGame(this.getRandomPhrase());
    }
    // Modify the key selected and check the game state
    handleInteraction(key) {
        let endGame = false;
        const classN = key.className;
        key.disabled = true;
        
        const rightGuess = this.board.showMatchedLetter(key.textContent);
        if (rightGuess) {
            key.className = `chosen ${classN}`;
            endGame = this.checkForWin();
        }
        else {
            key.className = `wrong ${classN}`;
            endGame = this.removeLife();
        }
        return endGame;
    }
    // Checks if all letters were showed
    checkForWin() {
        const hiddenLetters = this.board.container.getElementsByClassName('hide');
        const isEndGame = hiddenLetters.length === 0;

        if (isEndGame) {
            this.active = false;
            this.gameOver("win", "pulse");
        }

        return isEndGame;
    }
    // Modifies the score bar
    removeLife() {
        this.missed += 1;
        const isEndGame = this.missed === 5;
        const heart = this.scoreBar[this.scoreBar.length - this.missed];
        heart.className = 'animation-heart';
        
        delayChangeHeart(this);
        
        if (isEndGame) {
            this.active = false;
            this.gameOver("lose", "hinge");
        }

        return isEndGame;

        function delayChangeHeart(game) {
            setTimeout(() => {
                game.replaceHeart(heart, "break");
                setTimeout(() => {
                    game.replaceHeart(heart, "lost");
                }, 500);
                
            }, 500);
        }
    }
    // Changes the heart type
    replaceHeart(heart, typeHeart) {
        const url = heart.src;
        heart.src = url.replace(/(\w+)(\.svg)/, `${typeHeart}$2`);
    }
    // Handles the way to end game
    gameOver(finalState, animationClass) {
        delayToCover(this, this.board.animationTime(animationClass));
        
        const banner = document.getElementById('game-over-message');
        banner.textContent = `You ${finalState}`;
        this.overlay.className = finalState;

        function delayToCover(game, time) {
            setTimeout(() => {
                game.overlay.style.display = 'flex';
                game.reset();
            }, time);
        }
    }
    // Update the elements style 
    reset() {
        this.board.eraseGame();
        const keyboard = document.getElementById('qwerty').children;

        for (const keys of keyboard) {
            for (const key of keys.children) {
                key.disabled = false;
                key.className = "key";
            }
        }

        for (const heart of this.scoreBar) {
            heart.className = '';
        }
    }
}