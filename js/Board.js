
class Board {
    constructor(containerHTML, active = false) {
        this.container = containerHTML;
        this.active = active;
        this.phrase = null;
    }
get phrase() {
    return this._phrase;
}
set phrase(phrase) {
    this._phrase = phrase;
}

    drawGame(phrase) {
        this.phrase = new Phrase(phrase);
        const boxes = this.addPhraseToDisplay();
        for (const box of boxes) {
            this.container.appendChild(box);
        }
        this.active = true;
    }

    eraseGame() {
        this.container.innerHTML = "";
        this.active = false;
    }

    addPhraseToDisplay() {
        const letters = this.phrase.phrase.split('');
        const lettersBoxes = letters.map( letter => {
            const box = document.createElement('li');
            if (letter === ' '){
                box.className = `space`;
            }
            else {
                box.className = `hide letter ${letter}`;
                box.innerHTML = '?';
            }
            return box;
        });
        return lettersBoxes;
    }

    showMatchedLetter(char) {
        const letters = this.container.children;
        const exists = this.phrase.checkLetter(char);
        if (exists.length === 0) {
            return false;
        }

        for (const index of exists) {
            const letter = letters[index];
            const classShow = letter.className.replace("hide", "show");
            letter.className = classShow;
            letter.textContent = char;
        }

        return true;
    }
}