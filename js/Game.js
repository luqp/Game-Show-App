/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(container, overlay, scoreBar) {
        this.missed = 0;
        this.phrases = [
            'number four',
            'We were proud',
            'they were perfectly normal',  
            'thank you',
            'They were the last people',
            'be involved', 
            'anything strange or mysterious',
            'he was the director',
            'he had a mustache',
            'very useful',
            'she spent so much',
            'the neighbors',
            'a small boy',
            'they also had a secret', 
            'their greatest fear',
            'somebody',
            'discover'
        ];
        this.board = new Board(container)
        this.overlay = overlay;
        this.scoreBar = scoreBar;
    }

    get gameBoard() {
        return this.board;
    }
    getRandomPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[index];
    }

    starGame() {
        this.board.drawGame(this.getRandomPhrase());
    }

    handleInteraction(selectedHTML) {
        selectedHTML.disabled = true;
        const classN = selectedHTML.className;
        selectedHTML.className = `chosen ${classN}`;

        const rightGuess = this.gameBoard.showMatchedLetter(selectedHTML.textContent);

        if (rightGuess) {
            this.checkForWin();
        }
        else {
            this.removeLife();
        }
    }

    checkForWin() {
        const missing = this.board.container.getElementsByClassName('hide');
        
        if (missing.length === 0) {
            this.gameOver("win");
        }
    }

    removeLife() {
        this.missed += 1;
        const heart = this.scoreBar[this.scoreBar.length - this.missed];
        this.replaceHeart(heart, "lostHeart");

        if (this.missed === 5) {
            this.gameOver("lose");
        }
    }

    replaceHeart(heart, typeHeart) {
        const url = heart.src;
        heart.src = url.replace(/(\w+)(\.png)/, `${typeHeart}$2`);
    }

    gameOver(classN) {
        this.overlay.className = classN;
        this.overlay.style.display = 'block';
        const banner = document.getElementById('game-over-message');
        banner.textContent = `You ${classN}`;
        this.reset();
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
            this.replaceHeart(heart, "liveHeart");
        }
    }
}