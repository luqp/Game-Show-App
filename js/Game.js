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

    get board() {
        return this._board;
    }
    set board(board) {
        this._board = board;
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

    handleInteraction(key) {
        let endGame = false;
        const classN = key.className;
        key.className = `chosen ${classN}`;
        key.disabled = true;
        
        const rightGuess = this.board.showMatchedLetter(key.textContent);
        if (rightGuess) {
            endGame = this.checkForWin();
        }
        else {
            endGame = this.removeLife();
        }
        return endGame;
    }

    checkForWin() {
        const hiddenLetters = this.board.container.getElementsByClassName('hide');
        const isEndGame = hiddenLetters.length === 0;

        if (isEndGame) {
            this.active = false;
            this.gameOver("win", "pulse");
        }

        return isEndGame;
    }

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
                }, 800);
                
            }, 500);
        }
    }

    replaceHeart(heart, typeHeart) {
        const url = heart.src;
        heart.src = url.replace(/(\w+)(\.svg)/, `${typeHeart}$2`);
    }

    gameOver(finalState, animationClass) {
        delayToCover(this, this.animationTime(animationClass));
        
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

    animationTime(classN) {
        const boxes = document.getElementsByClassName('letter');

        for (let i = 0; i < boxes.length; i++) {
            setTimeout(() => {
                const c = boxes[i].className;
                boxes[i].className = `${classN} ${c}`;
                if (classN === "hinge") {
                    setTimeout(() => {
                        boxes[i].style.opacity = 0;
                    }, 500 + (i * 100));
                }
            }, 200 + (i * 100));
        }

        return (4000 + (boxes.length * 100));
    }
}